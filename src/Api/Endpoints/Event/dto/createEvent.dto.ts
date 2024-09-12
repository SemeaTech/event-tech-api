import { ApiProperty } from "@nestjs/swagger";

export class createEventDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  location: string;

  @ApiProperty({
    type: Date,
    required: true,
  })
  dateEvent: Date;

  @ApiProperty({
    type: String,
    required: true,
  })
  organization: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  eventDays: number;
  
  @ApiProperty({
    type: Number,
    required: true,
  })
  eventPrice: number;

  @ApiProperty({
    type: String,
    required: true,
  })
  eventPageLink: string;
}