import { AutoMap } from "@automapper/classes";
import { IsString, IsMobilePhone as IsPhoneNumber,IsStrongPassword, IsEnum } from 'class-validator';

export class CreateUserDto {
  @AutoMap()
  @IsString()
  name: string;
  @AutoMap()
  @IsPhoneNumber()
  phoneNumber: string;
  @AutoMap()
  @IsStrongPassword()
  password: string;
  @AutoMap()
  @IsEnum(['admin', 'user'])
  role: string;
}
