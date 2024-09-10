import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { EventController } from './Api/Endpoints/Event/event.controller';
import { EventModule } from './Api/Endpoints/Event/event.module';
import { Event } from './Api/Endpoints/Event/entity/event.entity';
import { SessionController } from './Api/Endpoints/session/session.controller';
import "dotenv/config";
import { UserController } from './Api/Endpoints/user/user.controller';
import { UserModule } from './Api/Endpoints/user/user.module';
import { AuthGuard } from './Api/Auth/auth.middleware';
import { User } from './Api/Endpoints/user/entity/user.entity';
import { SessionModule } from './Api/Endpoints/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false,
      entities: [
        User,
        Event,
      ],
      extra: {
        timezone: 'UTC',
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
    UserModule,
    EventModule,
    SessionModule,
  ],
  controllers: [
    AppController,
    UserController,
    EventController,
    SessionController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
