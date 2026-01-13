import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService],
  imports: [UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
