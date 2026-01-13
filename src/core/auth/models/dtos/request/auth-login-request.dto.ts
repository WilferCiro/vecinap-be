import { IsEmail, IsString } from 'class-validator';

export class AuthLoginRequestDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
