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
}
