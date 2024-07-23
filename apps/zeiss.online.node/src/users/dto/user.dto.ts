import { AutoMap } from "@automapper/classes";

export class UserDto {
  @AutoMap()
  id: number;
  @AutoMap()
  name: string;
  @AutoMap()
  phoneNumber: string;
  @AutoMap()
  role: string;
}