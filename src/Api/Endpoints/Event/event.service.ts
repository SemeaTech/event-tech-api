import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "./entity/event.entity";
import { Repository } from "typeorm";
import { createEventDto } from "./dto/createEvent.dto";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getAllEvents() {
    return await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.user', 'user')
      .select([
        'event.id', 
        'event.location', 
        'event.dateEvent', 
        'event.organization', 
        'event.eventDays', 
        'event.eventPrice', 
        'event.eventPageLink',
        'user.id', 
        'user.name'
      ])
      .getMany();
  }

  async createEvent(eventDto: createEventDto, userId: string) {
    const event = new Event();
    event.location = eventDto.location;
    event.dateEvent = eventDto.dateEvent;
    event.organization = eventDto.organization;
    event.eventDays = eventDto.eventDays;
    event.eventPrice = eventDto.eventPrice;
    event.userId = userId;
    event.eventPageLink = eventDto.eventPageLink;

    await this.eventRepository.save(event);
  }
}