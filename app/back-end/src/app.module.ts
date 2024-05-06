import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [AuthModule, FirebaseModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
