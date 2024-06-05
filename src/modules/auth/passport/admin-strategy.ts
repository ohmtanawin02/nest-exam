/* eslint-disable @typescript-eslint/ban-types */
import {
  Injectable,
  NotFoundException,
  ForbiddenException
} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin-auth') {
  private readonly routeMapping: object

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_ADMIN,
      passReqToCallback: true
    })
  }

  async validate({ params }, payload: any) {
    const userId = params.userId || params.user
    if (
      !payload.hasOwnProperty('id') &&
      userId &&
      payload.id !== Number(userId)
    ) {
      throw new ForbiddenException()
    }

    return payload
  }

  protected async assignRouteParams(params: object): Promise<void> {
    const paramsKeys = Object.keys(params)
    const filterKeys = paramsKeys.filter((key) =>
      this.routeMapping.hasOwnProperty(key)
    )

    const mappingPromises = filterKeys.map((key) =>
      this.routeMapping[key].resolveByUrl(params)
    )
    const promiseResults = await Promise.all(mappingPromises)

    if (promiseResults.some((doc) => !doc)) {
      throw new NotFoundException()
    }

    filterKeys.forEach((key, index) => {
      params[key] = promiseResults[index]
    })
  }
}
