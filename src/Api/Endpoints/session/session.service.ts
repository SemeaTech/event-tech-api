import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createSessionDto } from "./dto/createSession.dto";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "../user/entity/user.entity";
import { ManagePassword } from "src/Api/utils/bcrypt/managePassword";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken({ email, password }: createSessionDto): Promise<string | null> {
    const user: User = await this.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordValid = await ManagePassword.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, id: user.id };
    const token = await this.jwtService.signAsync(payload);

    return token;
  };

  private async getUserByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }
}