import { Controller, Get, Post, Body } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto';

@Controller('course')
export class CourseController {
    constructor(private courseservice: CourseService) {}

    @Get('get-course-by-id')
    getCourseById(@Body() id: string) {
        return this.courseservice.getCourseById(id);
    }

    @Post('add-course')
    addCourse(@Body() dto: CourseDto) {
        return this.courseservice.addCourse(dto);
    }
}
