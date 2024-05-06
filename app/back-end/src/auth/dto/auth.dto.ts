import { IsEmail, IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthSignupDto {
    @IsNotEmpty()
    @IsString()
    @IsIn(['student', 'teacher'], { message: "Invalid type of user." })
    user: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsString()
    id: string;

    @IsString()
    @IsNotEmpty()
    first_name: string;
    
    @IsString()
    @IsNotEmpty()
    last_name: string;
}

export class AuthSigninDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}