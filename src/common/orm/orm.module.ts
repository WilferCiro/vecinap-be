import { Global, Module } from '@nestjs/common';
import { ORM, PrismaService } from './prisma.orm.context';

@Global()
@Module({
  providers: [PrismaService, ORM],
  exports: [ORM],
})
export class ORMModule {}
