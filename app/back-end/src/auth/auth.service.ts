import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthSignupDto, AuthSigninDto } from './dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private firebase: FirebaseService, private jwt: JwtService, private config: ConfigService) {}
    
    async login(dto: AuthSigninDto) {
        // Find user by email in Firebase.
        const user = await this.firebase.findUserByEmail(dto.email.replace(/\./g, '_'));
        // If no user throw an exception.
        if (user == null) throw new ForbiddenException("No user finded!");

        // Compare password by argon hash value.
        const match = await argon.verify(user.hash, dto.password);
        // If they are not match throw an exception.
        if (!match) throw new ForbiddenException("Wrong password.");
        // Return user.
        delete user.hash;
        // return typeof parseInt(user.id);
        return this.signToken(user.id, user.email);
    }

    async signup(dto: AuthSignupDto) {
        // Creat hash key for user.
        const hash = await argon.hash(dto.password);
        // Save user to database.
        const createdAt = new Date().toUTCString();
        const updatedAt = new Date().toUTCString();
        // Prepare user data.
        const email = dto.email;
        const userData = {
            email: email.replace(/\./g, '_'),
            first_name: dto.first_name,
            last_name: dto.last_name,
            id: dto.id,
            hash: hash,
            createdAt: createdAt,
            updatedAt: updatedAt
        };
        try {
            switch (dto.user) {
                case 'student':
                    await this.firebase.createStudent(userData);
                    break;
                case 'teacher':
                    await this.firebase.createTeacher(userData);
                    break;
            }
            // delete userData.hash;
            // return userData;
            return this.signToken(dto.id, dto.email);
        }
        catch (error) {
            throw new ForbiddenException('Cannot write to database:\n' + error);
        }
    }

    async signToken(userId: string, email: string): Promise<{access_token: string}> {
        const data = {
            sub: userId,
            email
        }

        const secret = this.config.get("JWT_SECRET");

        const token = await this.jwt.signAsync(data, {expiresIn: '30m', secret: secret});
        
        return {access_token: token};
    }
}
