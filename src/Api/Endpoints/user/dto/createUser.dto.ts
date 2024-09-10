import { ApiProperty } from "@nestjs/swagger";

export class createUserDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  password: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  name: string;
}