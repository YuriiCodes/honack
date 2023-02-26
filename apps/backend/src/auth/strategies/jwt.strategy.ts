import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {jwtConstants} from "../../constants";
import {TokenPayload} from "@honack/util-shared-types";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: TokenPayload) {
    // check if payload is not expired:
    if (payload.exp < Date.now() / 1000) {
      throw new UnauthorizedException();
    }

    // return user:


    return { email: payload.email };
  }
}
