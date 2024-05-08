import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class StudentService {
    constructor(private firebase: FirebaseService) {}

    async findStudentByEmail(email: string) {
        const student = await this.firebase.findUserByEmail(email);

        return student;
    }

    async addCourseToStudentByEmail(email: string, course_id: string) {
        return await this.firebase.addCourseToStudentByEmail(email, course_id);
    }
}
