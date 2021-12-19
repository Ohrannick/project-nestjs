import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.message)
  message: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.author)
  author: string;

  @ValidateIf((o) => o.avatar)
  avatar: string;
}
