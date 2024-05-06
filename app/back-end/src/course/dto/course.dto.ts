import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CourseDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    id: string;

    
}