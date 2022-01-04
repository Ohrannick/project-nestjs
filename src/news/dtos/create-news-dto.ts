import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.title)
  title: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.description)
  description: string;

  @ValidateIf((o) => o.cover)
  cover: string;

  @IsNotEmpty()
  @IsString()
  userId: string
}
