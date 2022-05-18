import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateTodoDto {
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
