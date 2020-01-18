import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { GoogleLoginProvider } from './providers/google-login-provider';
import { LoginProvider } from './entities/login-provider';
import { SocialUser } from './entities/user';

@Injectable()
export class AuthServiceConfig {
  providers: Map<string, LoginProvider> = new Map<string, LoginProvider>();
  constructor() {
    this.providers.set('google', new GoogleLoginProvider());
  }
}

@Injectable()
export class SocialAuthService {
  private static readonly LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
  private providers: Map<string, LoginProvider>;
  public _user: SocialUser = null;
  private _authState: BehaviorSubject<SocialUser> = new BehaviorSubject(null);
  get authState(): Observable<SocialUser> {
    return this._authState.asObservable();
  }

  constructor() {
    const config = new AuthServiceConfig();
    this.providers = config.providers;
    this.providers.forEach((provider: LoginProvider, key: string) => {
      provider.initialize().then((user: SocialUser) => {
        user.provider = key;
        this._user = user;
        this._authState.next(user);
      }).catch((err) => {
        this._authState.next(null);
      });
    });
  }

  signIn(): Promise<SocialUser> {
    const providerId = 'google';
    return new Promise((resolve, reject) => {
      const providerObject = this.providers.get(providerId);
      if (providerObject) {
        providerObject.signIn().then((user: SocialUser) => {
          user.provider = providerId;
          resolve(user);
          this._user = user;
          this._authState.next(user);
        });
      } else {
        reject(SocialAuthService.LOGIN_PROVIDER_NOT_FOUND);
      }
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      const providerId = 'google';
      const providerObject = this.providers.get(providerId);
      providerObject.signOut().then(() => {
        this._user = null;
        this._authState.next(null);
        resolve();
      }).catch((err) => {
        this._authState.next(null);
      });
    });
  }
  execute(): Promise<any> {
    const providerId = 'google';
    return new Promise((resolve, reject) => {
      const providerObject = this.providers.get(providerId);
      providerObject.execute().then((response: any) => {
        resolve(response);
      });
    });
  }
}
