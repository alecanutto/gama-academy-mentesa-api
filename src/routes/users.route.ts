import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.usersController.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.usersController.getUserById);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(UpdateUserDto, 'body', true),
      this.usersController.updateUser,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.usersController.deleteUser);
  }
}

export default UsersRoute;
