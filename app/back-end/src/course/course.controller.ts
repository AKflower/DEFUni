import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('course')
export class CourseController {
    constructor(private courseservice: CourseService) {}

    @Get('get-course-by-id')
    async getCourseById(@Body() id: string) {
        return await this.courseservice.getCourseById(id);
    }

    @Post('add-course')
    async addCourse(@Body() dto: CourseDto) {
        return await this.courseservice.addCourse(dto);
    }

    @Post('add-student-to-course')
    async addStudentToCourse(@Body() payload: any) {
        return await this.courseservice.addStudentToCourse(payload.course_id, payload.email);
    }

    @UseGuards(JwtGuard)
    @Get('all-courses')
    async getAllCourse(@GetUser() user: any) {
        return await this.courseservice.getAllCourse(user.email);
    }

    @Post('add-document')
    async addDocumentToCourse(@Body() payload: any) {
        const course_id = payload.course_id;
        const doc = payload.doc;

        return this.courseservice.addDocumentToCourse(course_id, doc);
    }

    @Post('add-exam')
    async addExamToCourse(@Body() payload: any) {
        const course_id = payload.course_id;
        const exam = {
            startDate: payload.startDate,
            endDate: payload.endDate,
            name: payload.name
        }

        return this.courseservice.addExamToCourse(course_id, exam);
    }
}
