import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { config } from 'src/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends Strategy {
    constructor(private readonly authService: AuthService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true,
                secretOrKey: config.JWT_SECRET,
            },
            async (req, payload, next) => await this.verify(req, payload, next),
        );
        passport.use(this);
    }

    public async verify(req, payload, done) {
        const isValid = await this.authService.validateToken(payload);
        if (!isValid) {
            return done('Unauthorized', false);
        }
        req.jwt = payload;
        done(null, payload);
    }
}
