import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator'

export class CreateTodoDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  readonly position: number

  @IsString()
  @MaxLength(1024)
  @IsNotEmpty()
  @ApiProperty()
  readonly text: string

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly completed: boolean
}
