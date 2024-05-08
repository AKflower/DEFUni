import { DefaultValuePipe } from "@nestjs/common";
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, MinLength, Matches, IsBoolean, IsNumber } from "class-validator";

export class CourseDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    id: string;

    @IsString()
    description: string;

    @IsArray()
    @IsOptional()
    students_email: string[];

    @IsString()
    @IsNotEmpty()
    teacher_email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'Enroll date must be in dd/mm/yyyy format'
    })
    enroll_date: Date;
    
    @IsNotEmpty()
    @IsArray()
    schedule: string[];
    
    @IsNotEmpty()
    @IsString()
    quantity: string;
}