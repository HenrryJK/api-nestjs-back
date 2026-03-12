import { IsNotEmpty, IsString } from "class-validator";

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  nombre_color: string;
}
