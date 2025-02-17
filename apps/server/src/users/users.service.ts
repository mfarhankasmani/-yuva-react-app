import { Injectable } from '@nestjs/common';
import { User } from './models/user';
import { v4 as uuid } from 'uuid';
import { CreateUserInput } from 'src/dto/input/create-user.input';
import { UpdateUserInput } from 'src/dto/input/update-user.input';
import { GetUserArgs } from 'src/dto/args/get-user.args';
import { GetUsersArgs } from 'src/dto/args/get-users.args';
import { DeleteUserInput } from 'src/dto/input/delete-user.input';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      userId: uuid(),
      ...createUserData,
    };

    this.users.push(user);
    return user;
  }

  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find(
      (user) => user.userId === updateUserData.userId,
    )!;

    Object.assign(user, updateUserData);
    return user;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.userId === getUserArgs.userId)!;
  }

  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.userIds.map((userId) => this.getUser({ userId }));
  }

  public deleteUser(deleteUserData: DeleteUserInput): User {
    const index = this.users.findIndex(
      (user) => user.userId === deleteUserData.userId,
    );

    const user = this.users[index];
    this.users.splice(index);

    return user;
  }
}
