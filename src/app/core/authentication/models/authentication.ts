import { iAuthentication } from "../interfaces/iauthentication"

export class Authentication implements iAuthentication{

    private _auth: iAuthentication

    constructor(){
        this._auth = {
            username: '',
            password: ''
        }
    }

    setAuthObject(authObject: iAuthentication){
        this._auth = authObject
    }

    getAuthenticationRequestData(): any {
        return {
            request: {
                Usuario: this._auth.username,
                Contrasenya: this._auth.password
            }
        } 
    }

    getContentType(authenticationType: string):string{
        switch(authenticationType.toUpperCase()){
            case 'BASIC':
                return 'application/json'
            case 'SSI-OE':
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
