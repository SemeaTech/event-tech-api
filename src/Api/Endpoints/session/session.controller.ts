import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { createSessionDto } from './dto/createSession.dto';
import { SessionService } from './session.service';
import { Response } from 'express';
import "dotenv/config";
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/Api/decorators/public.routes';

@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(private service: SessionService) {}

  @Public()
  @Post('login')
  async login(@Body() body: createSessionDto, @Res() res: Response) {
    const accessToken = await this.service.generateToken(body);

    return res.status(HttpStatus.CREATED).cookie('token', accessToken, { 
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      path: "/",
      sameSite: "lax",
    }).json({ message: "Session created successfully" });
  }
}
