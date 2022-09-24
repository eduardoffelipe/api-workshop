import { ROLE } from '../../enums/role.enum';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: ROLE;
}
