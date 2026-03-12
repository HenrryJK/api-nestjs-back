import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register({name, email, password }: RegisterDto) {
        const user = await this.userService.findOneByEmail(email);
        if (user) {
            throw new BadRequestException('User already exists');
        }
        
        return await this.userService.create({
            name, 
            email, 
            // nota d henrry: aqui se encripte la contraseña antes de guardarla en la base de datos
            // con libreria bcryptjs 
            password: await bcrypt.hash(password, 10)
        });
    }

    async login({email, password}: LoginDto) {
       const user = await this.userService.findOneByEmail(email);
         if (!user) {  
            throw new UnauthorizedException('Email is wrong...!');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is wrong...!');
        }

        const payload = { email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email,
            // user: {
            //     name: user.name,
            //     email: user.email,
            // }, 
        };
    }

}
