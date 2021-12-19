import { IsString, ValidateIf, IsNotEmpty } from 'class-validator';

export class EditCommentDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.message)
  message: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.author)
  author: string;

  @ValidateIf((o) => o.avatar)
  avatar: string;
}