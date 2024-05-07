import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config'
import { CourseModule } from './course/course.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, FirebaseModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
