import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @ValidateIf((o) => o.countViews || o.countViews === '')
  countViews: number;

  @ValidateIf((o) => o.cover)
  cover: string;
}
