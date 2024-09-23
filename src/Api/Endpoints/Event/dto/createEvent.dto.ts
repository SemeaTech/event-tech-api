import { ApiProperty } from "@nestjs/swagger";
import { IDateRange } from "../event.interface";

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
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty({
    type: String,
    required: true,
  })
  organization: string;
  
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