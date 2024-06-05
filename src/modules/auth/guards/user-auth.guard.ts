import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Scope
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'

@Injectable({ scope: Scope.REQUEST })
export class UserAuthGuard extends AuthGuard('user-auth') {
  private static _this: UserAuthGuard
  private guardRole: string[]
  private request: Request
  private user: any = {
    id: 0,
    username: 'system'
  }
  constructor(private readonly reflector: Reflector) {
    super()

    UserAuthGuard._this = this
  }

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    UserAuthGuard.setRequest(request)
    this.guardRole = roles

    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }

    this.setAuthorizedUser(user)

    if (!this.guardRole) {
      return user
    }

    const hasRole = !!this.guardRole.some((item) => item === user.role)
    if (!hasRole) {
      throw new UnauthorizedException(info)
    }

    return user
  }

  public static getTokenFromRequest() {
    return UserAuthGuard._this.request.headers.authorization
  }

  public static setRequest(request: Request) {
    return (UserAuthGuard._this.request = request)
  }

  public static getRequest(): any {
    return UserAuthGuard._this.request
  }

  public static getParamsFromRequest() {
    return UserAuthGuard._this.request.params
  }

  public static getAuthorizedUser(): any {
    return UserAuthGuard._this.user
  }

  private setAuthorizedUser(user) {
    UserAuthGuard._this.user = user
  }
}
