import { ApiProperty } from '@nestjs/swagger';

export class ValueHelpFilterDto {
  @ApiProperty({
    description: 'The reference field',
    example: 'fieldName'
  })
  ref: string[];

  @ApiProperty({
    description: 'The filter function',
    example: 'contains'
  })
  func?: string;

  @ApiProperty({
    description: 'The filter value',
    example: 'searchValue'
  })
  val?: string;
}