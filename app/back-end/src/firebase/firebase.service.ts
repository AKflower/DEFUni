import { Injectable, HttpException, HttpStatus, ForbiddenException, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { CourseDto } from 'src/course/dto';
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

    async findCourseById(regex: string) {
        try {
            const coursesRef = admin.database().ref("courses");
            const snapshot = await coursesRef.orderByKey().startAt(regex).endAt(regex + "\uf8ff").once("value");

            const courses = [];
            snapshot.forEach((childSnapshot) => {
                const course = childSnapshot.val();
                courses.push(course);
            });
            
            return courses;
        }
        catch (error) {
            throw new NotFoundException("Cannot find user by email: " + error);
        }
    }
}
