import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route } from '@angular/router';
import { AuthenticationService } from './../_services';
import { JwtHelperService } from './../package';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthenticationService, private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.checkLoginToken()) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    return this.checkLogin(url);
  }
  checkLoginToken(): boolean {
    if (!this.jwtHelper.isTokenExpired()) { return true; } else {
      return false;
    }

  }
  checkLogin(url: string): boolean {
    if (!this.jwtHelper.isTokenExpired()) { return true; } else if (this.jwtHelper.isTokenExpired() && this.jwtHelper.tokenGetter()) {
      alert('Token Expired');
    }
    this.authService.redirectUrl = url;
    this.authService.logout();
    return false;
  }
}
