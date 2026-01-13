import { Module } from '@nestjs/common';
import { PqrsController } from './controllers/pqrs.controller';
import { PqrsService } from './services/pqrs.service';

@Module({
  controllers: [PqrsController],
  imports: [],
  providers: [PqrsService],
})
export class PqrsModule {}
