import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthSignupDto, AuthSigninDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthSignupDto): any {
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthSigninDto): any {
        return this.authService.login(dto);
    }
}