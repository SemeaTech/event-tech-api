import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { createEventDto } from "./dto/createEvent.dto";
import { Request, Response } from "express";
import { EventService } from "./event.service";
import { Public } from "src/Api/decorators/public.routes";
import { ICustomRequest } from "../types";

@ApiTags('Event') 
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
  ) {}

  @Public()
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'all events' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  async getAllEvents(@Res() res: Response) {
    try {
      const events = await this.eventService.getAllEvents();
      return res.status(HttpStatus.OK).json(events);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post("create")
  @ApiBody({ type: createEventDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'event created' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'bad request' })
  async createEvent(@Body() createEvent: createEventDto, @Req() req: ICustomRequest, @Res() res: Response) {
    const { id } = req.user;
    try {
      await this.eventService.createEvent(createEvent, id);
      return res.status(HttpStatus.CREATED).json({ message: 'event created' });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}