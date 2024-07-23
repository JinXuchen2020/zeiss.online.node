import { Mapper, MappingProfile, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from '@nestjs/common';
import { User } from "./entities/user.entity";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(
    @InjectMapper() mapper: Mapper
  ) {
    super(mapper);
  }
  
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, User, UserDto, forMember((destination) => destination.id, mapFrom((source) => source.id)));
      createMap(mapper, CreateUserDto, User);
      createMap(mapper, UpdateUserDto, User)
    };
  }
}
