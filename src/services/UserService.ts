import { DeleteResult, getRepository, Repository } from 'typeorm';
import { User } from '@models/User';
import bcrypt from 'bcryptjs';

class UserService {
  async addUser(userJson: User) {
    userJson.password = bcrypt.hashSync(userJson.password, bcrypt.genSaltSync(10));
    const userRepository: Repository<User> = getRepository(User);
    const user: User = await userRepository.save(userJson);

    return user;
  }

  async getUsers() {
    const userRepository: Repository<User> = getRepository(User);
    const users: User[] = await userRepository.find();

    return users;
  }

  async getUser(userId: string) {
    const userRepository: Repository<User> = getRepository(User);
    const user: User = await userRepository.findOne(userId);

    return user;
  }

  async updateUser(userId: string, userReplace: User) {
    if (userReplace.password) {
      userReplace.password = bcrypt.hashSync(userReplace.password, bcrypt.genSaltSync(10));
    }
    userReplace.updatedAt = new Date();
    const userRepository: Repository<User> = getRepository(User);
    await userRepository.update(userId, userReplace);
    const user: User = await userRepository.findOne(userId);

    return user;
  }

  async deleteUser(userId: string) {
    const userRepository: Repository<User> = getRepository(User);
    const deleteResult: DeleteResult = await userRepository.delete(userId);

    return deleteResult.affected === 1;
  }

  async getUserByUsername(username: string) {
    const userRepository: Repository<User> = getRepository(User);
    const user: User = await userRepository.findOne({ username });

    return user;
  }
}

export default new UserService();