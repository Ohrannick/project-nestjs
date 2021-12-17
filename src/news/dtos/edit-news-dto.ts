import { IsString, IsNotEmpty } from 'class-validator';

export class EditNewsDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  countViews?: number;
  cover?: string
}
