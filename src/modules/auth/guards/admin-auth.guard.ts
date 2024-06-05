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
export class AdminAuthGuard extends AuthGuard('admin-auth') {
  private static _this: AdminAuthGuard
  private guardRole: string[]
  private request: Request
  private user: any = {
    id: 0,
    username: 'system'
  }
  constructor(private readonly reflector: Reflector) {
    super()

    AdminAuthGuard._this = this
  }

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    AdminAuthGuard.setRequest(request)
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
    return AdminAuthGuard._this.request.headers.authorization
  }

  public static setRequest(request: Request) {
    return (AdminAuthGuard._this.request = request)
  }

  public static getRequest(): any {
    return AdminAuthGuard._this.request
  }

  public static getParamsFromRequest() {
    return AdminAuthGuard._this.request.params
  }

  public static getAuthorizedUser(): any {
    return AdminAuthGuard._this.user
  }

  private setAuthorizedUser(user) {
    AdminAuthGuard._this.user = user
  }
}
