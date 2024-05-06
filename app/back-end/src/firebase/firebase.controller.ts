import { Body, Controller, Post } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('firebase')
export class FirebaseController {
    constructor(private firebaseSevice: FirebaseService) {}

    @Post('write-student')
    addStudentToDB(@Body() studentData: any) {
        return this.firebaseSevice.createStudent(studentData);
    }

    @Post('write-teacher')
    addTeacherToDB(@Body() teacherData: any) {
        return this.firebaseSevice.createTeacher(teacherData);
    }

    @Post('write-course')
    addCourseToDB(@Body() courseData: any) {
        try {
            if (this.firebaseSevice.isValidCourseData(courseData)) return this.firebaseSevice.createCourse(courseData);
        }
        catch (error) {
            throw error;
        }
    }
}
