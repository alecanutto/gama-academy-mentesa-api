import { NextFunction, Request, Response } from 'express';
import { Professional, User } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';
import ProfessionalService from '@/services/professional.service';
import { CreateProfessionalDto } from '@/dtos/professionals.dto';

class AuthController {
  public authService = new AuthService();
  public professionalService = new ProfessionalService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      const ProfessionalData: CreateProfessionalDto = {
        name: userData.name,
        userId: signUpUserData.id,
      };

      const createProfessionalData: Professional = await this.professionalService.create(ProfessionalData);

      res.status(201).json({ data: { user: { signUpUserData }, professional: { createProfessionalData } }, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
