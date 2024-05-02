import { Body, Controller, Post } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('firebase')
export class FirebaseController {
    constructor(private firebaseSevice: FirebaseService) {}

    @Post('write-student')
    addStudentToDB(@Body() studentData: any) {
        try {
            if (this.firebaseSevice.isValidStudentData(studentData)) return this.firebaseSevice.createStudent(studentData);
        }
        catch (error) {
            throw error;
        }
    }

    @Post('write-teacher')
    addTeacherToDB(@Body() teacherData: any) {
        try {
            if (this.firebaseSevice.isValidTeacherData(teacherData)) return this.firebaseSevice.createTeacher(teacherData);
        }
        catch (error) {
            throw error;
        }
    }
}
