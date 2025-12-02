import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) throw new UnauthorizedException('Senha incorreta');

    const { senha: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(data: { nome: string; email: string; senha: string }) {
    const existe = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existe) throw new UnauthorizedException('Email já cadastrado');

    const hash = await bcrypt.hash(data.senha, 10);
    const user = await this.prisma.user.create({
      data: { nome: data.nome, email: data.email, senha: hash },
    });

    const { senha: _, ...result } = user;
    return result;
  }
}
