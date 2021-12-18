import { IsString, IsNumber, ValidateIf, IsNotEmpty } from 'class-validator';

export class EditNewsDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.title)
  title: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.description)
  description: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.author)
  author: string;

  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((o) => o.countViews || o.countViews === "")
  countViews: number;

  @ValidateIf((o) => o.cover)
  cover: string;
}
