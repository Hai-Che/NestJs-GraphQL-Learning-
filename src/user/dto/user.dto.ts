import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  username: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone: string;
}

@InputType()
export class UserFilter {
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  itemsPerPage?: number;
}

@InputType()
export class UpdateUserDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  username: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone: string;
}
