import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser, LoginProviderClass } from '../entities/user';
declare let gapi: any;
export class GoogleLoginProvider extends BaseLoginProvider {
    public static readonly PROVIDER_ID = 'google';
    public loginProviderObj: LoginProviderClass = new LoginProviderClass();
    private auth2: any;

    constructor() {
        super();
        this.loginProviderObj.id = '370114714466-c9755miia8n9dmnef9ivv0bufvl5a6pc.apps.googleusercontent.com';
        this.loginProviderObj.name = GoogleLoginProvider.PROVIDER_ID;
        this.loginProviderObj.url = 'https://apis.google.com/js/platform.js';
    }

    initialize(): Promise<SocialUser> {
        return new Promise(async (resolve, reject) => {
            this.loadScript(this.loginProviderObj, () => {
                gapi.load('client:auth2', () => {
                    this.auth2 = gapi.auth2.init({
                        client_id: this.loginProviderObj.id,
                        scope: 'email https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata',
                        prompt: 'select_account'
                    });
                    this.auth2.then(() => {
                        if (this.auth2.isSignedIn.get()) {
                            resolve(this.drawUser());
                        }
                    }).catch((ex) => {
                        reject(ex);
                    });
                });
            });
        });
    }

    drawUser(): SocialUser {
        const user: SocialUser = new SocialUser();
        const profile = this.auth2.currentUser.get().getBasicProfile();
        const authResponseObj = this.auth2.currentUser.get().getAuthResponse(true);
        user.id = profile.getId();
        user.name = profile.getName();
        user.email = profile.getEmail();
        user.image = profile.getImageUrl();
        user.token = authResponseObj.access_token;
        user.idToken = authResponseObj.id_token;
        user.expires_in = authResponseObj.expires_in;
        user.expires_at = authResponseObj.expires_at;
        sessionStorage.setItem('access_token', user.token);
        return user;
    }

    signIn(): Promise<SocialUser> {
        return new Promise((resolve, reject) => {
            const promise = this.auth2.signIn();
            promise.then(() => {
                resolve(this.drawUser());
            });
        });
    }

    signOut(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.auth2.signOut().then((err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
      // Make sure the client is loaded and sign-in is complete before calling this method.
    execute(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.loadScript(this.loginProviderObj, () => {
            gapi.load('client:auth2', () => {
                const promise = gapi.client.photoslibrary.albums.list({ excludeNonAppCreatedData: false});
                promise.then((result) => {
                    resolve(result);
                }).catch((err) => {
                    reject(err);
                });
            });
            });
        });
      }
}
