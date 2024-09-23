import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/Api/decorators/public.routes";
import { UserService } from "./user.service";
import { createUserDto } from "./dto/createUser.dto";
import { Response } from "express";
import { ICustomRequest } from "../types";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getUser(@Req() req: ICustomRequest, @Res() res: Response) {
    const { id } = req.user;
    try {
      const user = await this.service.getUserById(id);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Public()
  @Post('register')
  async register(@Body() body: createUserDto, @Res() res: Response) {
    try {
      await this.service.register(body);
      return res.status(HttpStatus.CREATED).json({ message: 'user created' });
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}