import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserPaginationResponse } from './models/user.model';
import { CreateUserDto, UpdateUserDto, UserFilter } from './dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserPaginationResponse)
  async users(
    @Args('filter') filter: UserFilter,
  ): Promise<UserPaginationResponse> {
    return await this.userService.findAll(filter);
  }

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('userData') userData: CreateUserDto): Promise<User> {
    return await this.userService.create(userData);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('userData') userData: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(Number(id), userData);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<Boolean> {
    return await this.userService.delete(Number(id));
  }
}
