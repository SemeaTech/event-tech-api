import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/Api/decorators/public.routes";
import { UserService } from "./user.service";
import { createUserDto } from "./dto/createUser.dto";
import { Response } from "express";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() body: createUserDto, @Res() res: Response) {
    try {
      await this.service.register(body);
      return res.status(HttpStatus.CREATED).json({ message: 'user created' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}