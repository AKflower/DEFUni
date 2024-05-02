import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as admin from 'firebase-admin';
require('dotenv').config();

@Injectable()
export class FirebaseService {
    private db: admin.database.Database
    
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert({
                // projectId: "defuni-db", // process.env.projectID
                projectId: process.env.projectID,
                // privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9uvLhEKUZnZpp\ngtlnMDAzz2mZni205ZyVC3VgLy0W1dd/T+lSbfi56O1W+qWOksVCm0g8ZQv6WHpH\nQyrAPg0Bj8LKCNaOF2q5rl6hAA50WopT8YyJNMfSpsyVOBI5wgk4A2KtHmXu83kB\nG9bjnIGge0Qd/P8/t2nAnJk1TnfW83dka2z98uIIkGxQUJVgnrA7keeYVY8fbgng\nxPlTHOVnJvhMsDN9M1CR/IAJVjpRMqPYaYdSbvp98mngSbj6zlJ8eCociIjbUWSK\nsJgRKirBYbsf2S1g8DlNJqHyWRHpJ5uITQ0hyOlAZP9/AatHVoNLBXe9B8GCyOg2\nGth4C/G7AgMBAAECggEAOEO3gSz5eRY203FdXW956/NnYon5DftFqyGBxmtXGL2D\nsZqWG77HEwLTV4bvD8/Qtcbs7hQdMDmK0ZVGmUoNe1gRsO5cCjlBihz+rQoiPzkW\nanxoa8v+MicK5nmBViWHrFe8rJAmNG15he2mlUs1Wc0UTzxWyaNvthH6kUda3KBE\n/Qo6XKXr35wsdyJTKq3GsGwmRqUsaF3AiAlgkME0CXPexz1wMVc1dOEZ8dNRCSx9\nwZcTkDYhTYZBpHOaJBxqymjoGY9PnbbSIxcOAjCDanlMVWynsqQYJWhb5vJAAwT6\nkALo8/Mvus314fvFQX/gt998ZhxcxyNdmZVy3lq62QKBgQD7idonoY0q8nyMySeV\nMJsXgVcc2/bwuyamHMgq158aIVqlvexmpQ3CeedBQcKS5WQIFS9OLGwpoRSXouYz\noyYopaFJ7fMeIRIHkbp/KnAroJPaNMg1cHCpCiAqIPWlM6MB6n2KpBjykpDjJAGe\n9F9l+wE093BtZAG6wZ5cRYNZ7QKBgQDBGHJ7f/wRZoGETpoUUIKpwaJvIGEpBWXl\nza7zksUBVeVLNMiF9HYhrFqmwt7yloENTh3LuVT6CxfeWUwX0fB+J/vKWYGTz56+\nkNwOATVzaWZE8A8EdlRmvJjimae4/DZ7VXnuVTiF6aWu5V1X0rTomd63e2iwB1Rs\n8f1QzEHlRwKBgQCCsBK6OINh5u6zLufz6XcK9VZPVjGszW+9KoMNT04Ig3/XUR/8\nDJFjk3aFPydarvgUAv26/fWMg3Zxel9kQMXYpIVyJcEEzGXTrPFalLAG2r02x+ml\nai/+g5ZGjS1TkcqFelGTsMKNdXz1poV5Erpl/82WuWCeVTFY2LPweOVP2QKBgGmB\nkyQZ5UAYs1H4pMXOy+Y3cCqqFYyVb3zmKt7Z5hz5swSpvZs73MQ/aXTO64S/aZo8\ngZlMFbteDlemkSY+xtoXvMNurpd2DTXw7twUGwGJqKCoTnxQr4NHL345GOTBon83\nUB1CoVTCOo5asusGrWSelovIuYXdK2svugrI4ISHAoGBAMvqmv1FFE+vzSjbpboh\nTN7R9uTgtKDqHY2avaF2TCJb/7N4z9v+KmQVdCXa2BP2QC2ONVYV4Cyl9vEoS+Iv\n2dmOSjZqzs1X3ZU8UBVMKKkPYDq8ZsbSadCrxyXvWh3lvL/Xj4+XHMl+83PWLOFB\ntUvWJkqjklvlWzT7vLHNdfyY\n-----END PRIVATE KEY-----\n", // process.env.privateKey
                privateKey: process.env.privateKey,
                // clientEmail: "firebase-adminsdk-ykvcq@defuni-db.iam.gserviceaccount.com" //process.env.clientEmail
                clientEmail: process.env.clientEmail,
            }),
            // databaseURL: "https://defuni-db-default-rtdb.asia-southeast1.firebasedatabase.app"
            databaseURL: process.env.databaseURL
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
        const newStudentRef = this.db.ref('students').child(studentData.id);
        delete studentData.id
        await newStudentRef.set(studentData);
        return newStudentRef.key;
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
        const newTeacherRef = this.db.ref('teachers').child(teacherData.id);
        delete teacherData.id
        await newTeacherRef.set(teacherData)
        return newTeacherRef.key
    }

    async createCourse(courseData: any) {
        const newCourseRef = this.db.ref('courses').child(courseData.id);
        delete courseData.id
        await newCourseRef.set(courseData)
        return newCourseRef.key
    }
}
