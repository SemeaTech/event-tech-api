import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Not, Repository } from "typeorm";
import { createUserDto } from "./dto/createUser.dto";
import { ManagePassword } from "src/Api/utils/bcrypt/managePassword";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUserById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return {
      name: user.name,
    };
  }

  async register({ email, password, name }: createUserDto) {
    const userAlreadyExists = await this.usersRepository.findOneBy({ email });

    if (userAlreadyExists) {
      throw new BadRequestException("User already exists");
    }
    
    const user = new User();
    user.email = email;
    user.password = await ManagePassword.hashPassword(password);
    user.name = name;

    return await this.usersRepository.save(user);
  }
}