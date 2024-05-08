import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private studentservice: StudentService) {}

    @Post('add-course')
    async addCourseToStudentByEmail(@Body() payload) {
        return this.studentservice.addCourseToStudentByEmail(payload.email, payload.course_id);
    }
}
