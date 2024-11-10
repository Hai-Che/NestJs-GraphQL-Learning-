import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './models/auth.model';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async register(userData: RegisterDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (user) {
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
    return newUser;
  }

  async login(userData: LoginDto): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const checkPassword = bcrypt.compareSync(userData.password, user.password);
    if (!checkPassword) {
      throw new HttpException(
        { message: 'Invalid password' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { id: user.id, email: user.email, name: user.username };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: 60,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
}
