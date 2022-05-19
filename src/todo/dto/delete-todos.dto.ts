import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty } from 'class-validator'

export class DeleteTodosDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [Number] })
  readonly ids: number[]
}
