import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './models/user';
import { UsersService } from './users.service';
import { GetUserArgs } from 'src/dto/args/get-user.args';
import { GetUsersArgs } from 'src/dto/args/get-users.args';
import { CreateUserInput } from 'src/dto/input/create-user.input';
import { UpdateUserInput } from 'src/dto/input/update-user.input';
import { DeleteUserInput } from 'src/dto/input/delete-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this.usersService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
    return this.usersService.getUsers(getUsersArgs);
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): User {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): User {
    return this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
    return this.usersService.deleteUser(deleteUserData);
  }
}
