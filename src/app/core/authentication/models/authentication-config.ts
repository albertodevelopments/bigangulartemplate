import { iAuthenticationConfig } from "../interfaces/iauthentication-config";

export class AuthenticationConfig implements iAuthenticationConfig{

    private _url: string
    private _authentication: {}

    constructor(url: string, authentication: {}){
        this._url = url
        this._authentication = authentication
    }

    get url(): string{
        return this._url
    }

    get authentication(): any{
        return this._authentication
    }

    get authenticationConfig(): iAuthenticationConfig{
        const authenticationConfigObject = {
            url: this._url,
            authentication: this._authentication
        }

        return authenticationConfigObject as iAuthenticationConfig
    }
}