import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/users/role.enum';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);
