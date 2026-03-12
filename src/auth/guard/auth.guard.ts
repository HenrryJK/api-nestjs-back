import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // aqui le pasó el request al metodo privado que cree.
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException;
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );

      // request['user'] = payload;
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException;
    }

    return true;
  }


  // nota d henrry: aqui cree un metodo para poder extraer el token del header de autorizacion y 
  // luego se puedar validar el token si es valido o no.
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
