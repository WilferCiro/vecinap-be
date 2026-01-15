import { Injectable } from '@nestjs/common';
import { ORM } from 'src/common/orm/prisma.orm.context';
import { PqrsCreateRequestDto } from '../models/dtos/request/pqrs-create.dto';
import { JwtPayload } from 'src/common/auth/models/interfaces/auth.interface';
import { AppError } from 'src/common/exception/app.error';
import {
  PqrsErrorCodes,
  PqrsErrorCodesDefinitions,
} from '../constants/pqrs-errror.constants';
import { PqrsStatus, UserResidentialRole } from '@prisma/client';
import { PqrsListFiltersDto } from '../models/dtos/request/pqrs-list.dto';
import { PqrsListResponseDto } from '../models/dtos/response/pqrs-list-response.dto';
import { TablePaginatorResponseDto } from 'src/common/models/dtos/response/table-paginator.-response.dto';
import { PqrsAddResponseDto } from '../models/dtos/request/pqrs-add-response.dto';

@Injectable()
export class PqrsService {
  constructor(private readonly orm: ORM) {}

  async create(
    body: PqrsCreateRequestDto,
    user: JwtPayload,
  ): Promise<{ success: true }> {
    try {
      await this.orm.pqrs.create({
        data: {
          description: body.description,
          residenceId: user.residential.id,
          userId: user.sub,
          type: body.type,
          status: PqrsStatus.OPEN,
          subject: body.subject,
        },
      });
      return { success: true };
    } catch (e) {
      throw new AppError(
        PqrsErrorCodesDefinitions[PqrsErrorCodes.CREATION_FAILED],
        e.message,
      );
    }
  }

  async list(
    filters: PqrsListFiltersDto,
    user: JwtPayload,
  ): Promise<TablePaginatorResponseDto<PqrsListResponseDto>> {
    const filtersOrm = {
      residenceId: user.residential.id,
      ...(user.residential.role !== UserResidentialRole.ADMIN
        ? { userId: user.sub }
        : {}),
      ...(filters.type ? { type: filters.type } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.startDate && filters.endDate
        ? { createdAt: { lte: filters.endDate, gte: filters.startDate } }
        : {}),
    };
    const count = await this.orm.pqrs.count({
      where: filtersOrm,
    });
    const data = await this.orm.pqrs.findMany({
      where: filtersOrm,
      take: +filters.count,
      skip: +filters.page * +filters.count,
      select: {
        id: true,
        createdAt: true,
        description: true,
        status: true,
        type: true,
        subject: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        pqrsResponses: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            createdAt: true,
            message: true,
            responder: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return {
      data,
      pagination: {
        count,
      },
    };
  }

  async addResponse(
    pqrsId: number,
    input: PqrsAddResponseDto,
    user: JwtPayload,
  ): Promise<{ ok: true }> {
    await this.orm.pqrsResponse.create({
      data: {
        message: input.message,
        pqrsId: pqrsId,
        responderId: user.sub,
      },
    });
    await this.orm.pqrs.update({
      where: {
        id: pqrsId,
      },
      data: {
        status: PqrsStatus.CLOSED,
      },
    });
    return { ok: true };
  }

  async remove(pqrsId: number, user: JwtPayload): Promise<{ success: true }> {
    try {
      await this.orm.pqrs.delete({
        where: {
          id: pqrsId,
          userId: user.sub,
        },
      });
      return { success: true };
    } catch (e) {
      throw new AppError(
        PqrsErrorCodesDefinitions[PqrsErrorCodes.DELETE_FAILED],
        e.message,
      );
    }
  }
}
