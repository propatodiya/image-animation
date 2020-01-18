export class JwtModel {
    decodedToken: DecodedToken;
    expirationDate: Date;
    isExpired: boolean;
}

export class DecodedToken {
    email: string;
    id: number;
    mobile_no: string;
    sub: string;
    user_name: string;
    role: string[];
    scopes: string[];
    oauth_token: string;
    opcRandomCode: string;
    iss: string;
    iat: number;
    exp: number;
    nbf: number;
    jti: string;
}
