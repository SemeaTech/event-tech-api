import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { createUserDto } from "./dto/createUser.dto";
import { ManagePassword } from "src/Api/utils/bcrypt/managePassword";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register({ email, password, name }: createUserDto) {
    const userAlreadyExists = await this.usersRepository.findOneBy({ email });

    if (userAlreadyExists) {
      throw new BadGatewayException("User already exists");
    }
    
    const user = new User();
    user.email = email;
    user.password = await ManagePassword.hashPassword(password);
    user.name = name;

    return await this.usersRepository.save(user);
  }
}