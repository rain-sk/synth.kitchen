export class CreateUserDto {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly passwordHash: string;
}
