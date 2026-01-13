import { SetMetadata } from '@nestjs/common';
import { UserResidentialRole } from '@prisma/client';

export const Roles = (...roles: UserResidentialRole[]) => SetMetadata('roles', roles);
