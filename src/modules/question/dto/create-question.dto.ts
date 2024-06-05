import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateQuestionDto {
  @ApiProperty({
    example: `1. ผลลัพธ์ของสมการด้านล่าง คืออะไร? (อธิบายตามหลักคณิตศาสตร์)`
  })
  @IsNotEmpty()
  @IsString()
  readonly question: string

  @ApiPropertyOptional({
    example: `var result =  (10 / 5 + 2 * 2 - 1) % 1; หรือ <a href="https://freeimage.host/i/JtnL8es"><img src="https://iili.io/JtnL8es.th.png" alt="JtnL8es.th.png" border="0"></a>`
  })
  @IsOptional()
  @IsString()
  readonly subQuestion: string

  @ApiProperty({
    example: false
  })
  @IsNotEmpty()
  @IsBoolean()
  readonly isCoding: boolean
}
