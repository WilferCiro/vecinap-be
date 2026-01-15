import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    super({
      adapter: new PrismaPg(pool),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

@Injectable()
export class ORM {
  constructor(public readonly service: PrismaService) {}

  get prisma() {
    return this.service;
  }

  get user() {
    return this.service.user;
  }

  get pqrs() {
    return this.service.pqrs;
  }

  get pqrsResponse() {
    return this.service.pqrsResponse;
  }
}
