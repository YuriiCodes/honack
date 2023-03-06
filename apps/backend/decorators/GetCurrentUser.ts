import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import jwt_decode from 'jwt-decode';
import { UserFromToken } from '@honack/util-shared-types';



const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext): UserFromToken => {
    const req = context.switchToHttp().getRequest();

    // call the jwt library to decode the token
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!jwtFromRequest) {
      throw new UnauthorizedException('Token not found');
    }

    const decoded = jwt_decode(jwtFromRequest);

    if (!decoded) {
      throw new UnauthorizedException('Token not found');
    }
    return decoded as UserFromToken;
  }
);

export default GetCurrentUser;
