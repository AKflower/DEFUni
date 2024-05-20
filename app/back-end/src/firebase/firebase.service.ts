import { Injectable, HttpException, HttpStatus, ForbiddenException, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { error } from 'console';
import { GetUser } from 'src/auth/decorator';
import { MinLength } from 'class-validator';
import { userInfo } from 'os';
require('dotenv').config();

@Injectable()
export class FirebaseService {
    private db: admin.database.Database;
    
    constructor(private configService: ConfigService) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: this.configService.get('projectId'),
                privateKey: this.configService.get('privateKey'),
                clientEmail: this.configService.get('clientEmail'),
            }),
            databaseURL: this.configService.get('databaseURL'),
        })
        this.db = admin.database();
    }

    isValidStudentData(studentData: any): boolean {
        if (!studentData.hasOwnProperty('id')) {
            throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);
        }
    
        const id = studentData.id;
        if (!/^\d{7}$/.test(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
    
        return true;
    }

    async createStudent(studentData: any) {
        try {
            if (this.isValidStudentData(studentData)) {
                const newStudentRef = this.db.ref('students').child(studentData.email);
                delete studentData.email;
                await newStudentRef.set(studentData);
            }
        }
        catch (error) {
            throw error;
        }
    }

    isValidTeacherData(teacherData: any): boolean {
        if (!teacherData.hasOwnProperty('id')) {
            throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);
        }
    
        const id = teacherData.id;
        if (!/^\d{7}$/.test(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
    
        return true;
    }

    async createTeacher(teacherData: any) {
        try {
            if (this.isValidTeacherData(teacherData)) {
                const newTeacherRef = this.db.ref('teachers').child(teacherData.email);
                delete teacherData.email;
                await newTeacherRef.set(teacherData);
            }
        }
        catch (error) {
            throw error;
        }
    }

    isValidCourseData(courseData: any): boolean {
        if (!courseData.hasOwnProperty('id')) {
            throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);
        }
    
        const id = courseData.id;
        if (!/^[A-Za-z]{2}\d{4}_[A-Za-z]{1,4}\d{2}$/.test(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
    
        return true;
    }

    async createCourse(courseData: any) {
        try {
            if (this.isValidCourseData(courseData)) {
                const newCourseRef = this.db.ref('courses').child(courseData.id);
                delete courseData.id;
                await newCourseRef.set(courseData);
            }
            else throw new ForbiddenException("Invalid data");
        }
        catch (error) {
            throw error;
        }
    }

    // Functions for get data

    async findUserByEmail(email: string): Promise<any> {
        try {
            const student_path = "/students/" + email.replace(/\./g, '_');
            const teacher_path = "/teachers/" + email.replace(/\./g, '_');
        
            const student_snapshot = await admin.database().ref(student_path).once('value');
            const teacher_snapshot = await admin.database().ref(teacher_path).once('value');
            
            if (student_snapshot.exists()) return student_snapshot.val();
            else if (teacher_snapshot.exists()) return teacher_snapshot.val();
            else throw new NotFoundException("User with email " + email + " not found.");
        }
        catch (error) {
            throw new NotFoundException("Cannot find user by email: " + error);
        }
    }

    async findCourseById(regex: any) {
        try {
            const coursesRef = await admin.database().ref("/courses").once('value');
            const rx = new RegExp('^' + regex.id + '.*');
            console.log(regex);
            const courses: any[] = [];
            
            if (coursesRef.exists) {
                const coursesArr = coursesRef.val();
                
                for (const courseId of Object.keys(coursesArr)) {
                    if (rx.test(courseId)) {
                        const data = {
                            id: courseId,
                            description: coursesArr[courseId].description,
                            name: coursesArr[courseId].name,
                            enroll_date: coursesArr[courseId].enroll_date,
                            teacher_email: coursesArr[courseId].teacher_email,
                            quantity: coursesArr[courseId].quantity,
                            students_email: coursesArr[courseId].students_email,
                            schedule: coursesArr[courseId].schedule,
                        }
                        courses.push(data);
                    }
                }
            }
            
            return courses;
        }
        catch (error) {
            throw new NotFoundException("Cannot find user by email: " + error);
        }
    }

    async addCourseToStudentByEmail(email: string, course_id: string): Promise<any> {
        try {
            const student_path = "/students/" + email.replace(/\./g, '_');
        
            const student_snapshot = await admin.database().ref(student_path).once('value');
            
            if (student_snapshot.exists()) {
                const studentData = student_snapshot.val();
                if (!studentData.hasOwnProperty('course_id') || !Array.isArray(studentData.course_id)) studentData.course_id = [];

                studentData.course_id.push(course_id);
                await admin.database().ref(student_path).update({ course_id: studentData.course_id });
            }
            else throw new NotFoundException("User with email " + email + " not found.");

            return course_id;
        }
        catch (error) {
            throw new NotFoundException("Cannot find user by email: " + error);
        }
    }

    async addStudentToCourse(course_id: string, email: string): Promise<any> {
        try {
            const path = "/courses/" + course_id;
        
            const snapshot = await admin.database().ref(path).once('value');
            
            if (snapshot.exists()) {
                const courseData = snapshot.val();
                if (!courseData.hasOwnProperty('students_email') || !Array.isArray(courseData.students_email)) courseData.students_email = [];

                courseData.students_email.push(email);
                await admin.database().ref(path).update({ students_email: courseData.students_email });
            }
            else throw new NotFoundException("User with email " + course_id + " not found.");

            return email;
        }
        catch (error) {
            throw new NotFoundException("Cannot find user by course_id: " + error);
        }
    }

    async getAllCourse(userEmail: string) {
        try {
            const snapshot = await admin.database().ref("/courses").once('value');
            const userInfo = await this.findUserByEmail(userEmail);
            const courses = [];
    
            if (snapshot.exists()) {
                const coursesArr = snapshot.val();
                let userCourses = userInfo.course_id;
                
                for (const courseId of Object.keys(coursesArr)) {
                    let b = false;
                    const courseData = coursesArr[courseId];
                    
                    if (userCourses) {
                        for (const cid of userCourses) {
                            if (cid === courseId) {
                                b = true;
                                break;
                            }
                        }
                    }
                    
                    const teacherInfo = await this.findUserByEmail(courseData.teacher_email);

                    const teacher_degree = teacherInfo.degree;
                    const teacher_fname = teacherInfo.first_name;
                    const teacher_lname = teacherInfo.last_name;
                
                    let quantity: string;
                    if (courseData.students_email) quantity = courseData.students_email.length.toString();
                    else quantity = "0";
                    const data = {
                        name: courseData.name,
                        id: courseId,
                        description: courseData.description,
                        enroll_date: courseData.enroll_date,
                        // teacher: teacher_degree + " " + teacher_fname + " " + teacher_lname,
                        teacher: teacher_degree + ". " + teacher_fname + " " + teacher_lname,
                        schedule: courseData.schedule[0] + " " + courseData.schedule[1],
                        registered: b,
                        quantity:  quantity + "/" + courseData.quantity
                    };
                    courses.push(data);
                }
                return courses;
            }
            else throw new NotFoundException("Not found /courses path!");
        }
        catch (error) {
            throw new ForbiddenException("Error:" + error);
        }
    }

    async addDocumentToCourse(course_id: string, doc: string): Promise<any> {
        try {
            const path = "/courses/" + course_id;
        
            const snapshot = await admin.database().ref(path).once('value');
            
            if (snapshot.exists()) {
                const courseData = snapshot.val();
                if (!courseData.hasOwnProperty('documents') || !Array.isArray(courseData.documents)) courseData.documents = [];

                courseData.documents.push(doc);
                await admin.database().ref(path).update({ documents: courseData.documents });
            }
            else throw new NotFoundException("User with email " + course_id + " not found.");

            return doc;
        }
        catch (error) {
            throw new NotFoundException("Cannot find user by course_id: " + error);
        }
    }

    async addExamToCourse(course_id: string, exam: any): Promise<any> {
        try {
            const startD = exam.startDate;
            const endD = exam.endDate;
            const name = exam.name;
            
            const coursePath = "/courses/" + course_id;
    
            const courseSnapshot = await admin.database().ref(coursePath).once('value');
            const examSnapshot = admin.database().ref(coursePath).child("examinations").child(name);
            
            if (!courseSnapshot.exists()) {
                throw new Error("Course with ID " + course_id + " not found.");
            }
    
            const courseData = courseSnapshot.val();
    
            let num_of_students: any;
            if (courseData.students_email) num_of_students = courseData.students_email.length;
    
            for (let i = 0; i < num_of_students; i++) {
                const studentEmail = courseData.students_email[i].replace(/\./g, '_');
                const data = {
                    startDate: exam.startDate,
                    endDate: exam.endDate,
                    submit: null,
                    score: null
                };
                const r = admin.database().ref(coursePath + "/examinations/" + exam.name).child(studentEmail);
                r.set(data);
            }
            // await admin.database().ref(coursePath).update({ examinations: courseData.examinations });
    
            return exam;
        } catch (error) {
            throw new Error("Error adding exam to course with ID " + course_id + ": " + error.message);
        }
    }
}
