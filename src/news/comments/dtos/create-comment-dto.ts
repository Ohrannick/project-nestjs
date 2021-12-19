import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @ValidateIf((o) => o.avatar)
  avatar: string;
}