import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser, JwtHelperService } from '../package/index';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthenticationService, private socialAuthService: SocialAuthService, public router: Router,
              private jwtHelper: JwtHelperService) {
    if (!this.jwtHelper.isTokenExpired()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }
  socialLogin() {
    this.socialAuthService.signIn().then((userData: SocialUser) => {
      this.authService.login(userData.idToken).then((res: any) => {
        if (this.authService.isLoggedIn) {
          const redirect = this.router.parseUrl(this.authService.redirectUrl);
          this.router.navigateByUrl(redirect);
        }
      }, (error: any) => {
        console.error(error);
      });
    }, (error: any) => {

    });
  }
}
