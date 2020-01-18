export class SocialUser {
    provider: string;
    id: string;
    email: string;
    name: string;
    image: string;
    token?: string;
    idToken?: string;
    expires_in?: number;
    expires_at?: number;
}

export class LoginProviderClass {
    name: string;
    id: string;
    url: string;
}

