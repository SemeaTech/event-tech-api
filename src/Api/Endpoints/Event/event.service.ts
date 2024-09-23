import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "./entity/event.entity";
import { Repository } from "typeorm";
import { createEventDto } from "./dto/createEvent.dto";
import { start } from "repl";

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
        'event.startDate', 
        'event.endDate',
        'event.organization', 
        'event.eventPrice', 
        'event.eventPageLink',
        'user.id', 
        'user.name'
      ])
      .getMany();
  }

  async getEventsByUserId(userId: string) {
    return await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.user', 'user')
      .where('user.id = :userId', { userId })
      .select([
        'event.id', 
        'event.location', 
        'event.startDate', 
        'event.endDate',
        'event.organization', 
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
    event.startDate = eventDto.startDate;
    event.endDate = eventDto.endDate || null;
    event.organization = eventDto.organization;
    event.eventPrice = eventDto.eventPrice;
    event.userId = userId;
    event.eventPageLink = eventDto.eventPageLink;

    await this.eventRepository.save(event);
  }

  async updateEvent(id: string, eventDto: createEventDto, userId: string) {
    const event = await this.eventRepository.findOneBy({ id });
    event.location = eventDto.location;
    event.startDate = eventDto.startDate;
    event.endDate = eventDto.endDate || null;
    event.organization = eventDto.organization;
    event.eventPrice = eventDto.eventPrice;
    event.userId = userId;
    event.eventPageLink = eventDto.eventPageLink;

    await this.eventRepository.save(event);
  }
}