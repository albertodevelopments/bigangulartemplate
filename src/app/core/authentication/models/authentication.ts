import { iAuthentication } from "../interfaces/iauthentication";

export class Authentication implements iAuthentication{

    private _auth: iAuthentication

    constructor(auth: iAuthentication){
        this._auth = auth
    }

    getRequestData(): any {
        return {
            request: {
                Usuario: this._auth.username,
                Contrasenya: this._auth.password
            }
        } 
    }

    getContentType(authenticationType: string):string{
        switch(authenticationType){
            case 'basic':
                return 'application/json'
            case 'sso-oe':
                return 'application/x-www-form-urlencoded'
            default:
                return 'application/json'
        }
    }

    get username(): string{
        return this._auth.username
    }

    get password(): string{
        return this._auth.password
    }
}
