import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  phone?: string;
}

@ObjectType()
export class UserPaginationResponse {
  @Field(() => [User])
  data: User[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  itemsPerPage: number;
}
