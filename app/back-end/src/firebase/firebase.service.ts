import { Injectable, HttpException, HttpStatus, ForbiddenException, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
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
    
        const id = studentData.id.toString();
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
    
        const id = teacherData.id.toString();
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
    
        const id = courseData.id.toString();
        if (!/^[A-Za-z]{2}\d{4}_[A-Za-z]\d{2}$/.test(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
    
        return true;
    }

    async createCourse(courseData: any) {
        try {
            if (this.isValidCourseData) {
                const newCourseRef = this.db.ref('courses').child(courseData.id);
                delete courseData.id;
                await newCourseRef.set(courseData);
            }
        }
        catch (error) {
            throw error;
        }
    }

    // Functions for get data

    async findUserbyEmail(email: string): Promise<any> {
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
}
