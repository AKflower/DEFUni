import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    @Get('me')
    getMe(@GetUser() user: any) {
        return user;
    }
}