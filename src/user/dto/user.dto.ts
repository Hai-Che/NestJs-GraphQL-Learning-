import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: String;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(6)
  password: String;

  @Field(() => String, { nullable: true })
  @IsOptional()
  username: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone: String;
}
