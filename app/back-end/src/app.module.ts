import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config'
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, FirebaseModule, CourseModule, StudentModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
