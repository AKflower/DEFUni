import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CourseDto } from './dto';

@Injectable()
export class CourseService {
    constructor(private firebase: FirebaseService) {}

    async getCourseById(id: string): Promise<any> {
        const course = await this.firebase.findCourseById(id);

        if (course == null) throw new NotFoundException("No course finded!");

        return course;
    }

    async addCourse(dto: CourseDto) {
        await this.firebase.createCourse(dto);
    }

    async addStudentToCourse(course_id: string, email: string) {
        return await this.firebase.addStudentToCourse(course_id, email);
    }

    async getAllCourse(userEmail: string) {
        return await this.firebase.getAllCourse(userEmail);
    }
}
