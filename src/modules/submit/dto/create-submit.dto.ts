import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'

class AnswerDto {
  @ApiProperty({
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  readonly question: number

  @ApiProperty({
    example: ''
  })
  @IsNotEmpty()
  @IsString()
  readonly answer: string

  @ApiProperty({
    example: ''
  })
  @IsNotEmpty()
  @IsString()
  readonly submitBy: string
}

export class SubmitDto {
  @ApiProperty({ type: () => [AnswerDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  readonly answers: AnswerDto[]
}
