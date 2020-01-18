import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { JwtHelperService, JwtModel, DecodedToken, SocialAuthService } from '../../package';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private static readonly LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
  public JwtToken = new JwtModel();
  public isLoggedIn = false;
  public redirectUrl: string;
  public user: DecodedToken = new DecodedToken();
  public currentUser: Observable<DecodedToken>;
  public helper = new JwtHelperService();
  public currentUserSubject: BehaviorSubject<DecodedToken> = new BehaviorSubject(null);
  constructor(private socialAuthService: SocialAuthService, private router: Router) {
    this.user = new DecodedToken();
    this.currentUserSubject = new BehaviorSubject<DecodedToken>(null);
  }

  public get currentUserValue(): Observable<DecodedToken> {
    // return this.currentUserSubject.value;
    return this.currentUserSubject.asObservable();
  }

  login(token: string): Promise<DecodedToken> {
    return new Promise((resolve, reject) => {
      try {
        this.helper = new JwtHelperService();
        this.JwtToken.decodedToken = this.helper.decodeToken(token);
        this.JwtToken.isExpired = this.helper.isTokenExpired(token);
        if (!this.JwtToken.isExpired) {
          this.isLoggedIn = true;
          this.user = this.JwtToken.decodedToken;
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('user', JSON.stringify(this.JwtToken.decodedToken));
          this.currentUserSubject.next(this.JwtToken.decodedToken);
          this.redirectUrl = '/home';
          return resolve(this.JwtToken.decodedToken);
        } else {
          this.isLoggedIn = false;
          return reject(AuthenticationService.LOGIN_PROVIDER_NOT_FOUND);
        }
      } catch (e) {
        return reject(e);
      }
    });
  }

  logout(): void {
    this.socialAuthService.signOut().then((res: any) => {
    });
    this.isLoggedIn = false;
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
