import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { envConfig } from '@config';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = new PrismaClient().user;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Nenhum dado foi informado');

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `O email ${userData.email} já está cadastrado`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Promise<User> = this.users.create({
      data: { email: userData.email, password: hashedPassword },
    });

    return createUserData;
  }

  public async login(userData: LoginUserDto): Promise<{ tokenData: TokenData; cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'Nenhum dado foi informado');

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `O email ${userData.email} não foi encontrado`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Senha inválida');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { tokenData, cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Nenhum dado foi informado');

    const findUser: User = await this.users.findFirst({
      where: { email: userData.email, password: userData.password },
    });
    
    if (!findUser) throw new HttpException(409, "Usuário inexistente");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = envConfig.jwt.secret;
    const expiresIn: number = envConfig.jwt.accessExpirationMinutes * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
