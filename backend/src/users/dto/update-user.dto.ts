

import {  IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  firstname?: string;

  @IsNotEmpty()
  lastname?: string;

  @IsNotEmpty()
  age?: number;
}
