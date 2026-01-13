import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { ORMModule } from './common/orm/orm.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PqrsModule } from './core/pqrs/pqrs.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: '123',
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ORMModule,
    AuthModule,
    UserModule,
    PqrsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
