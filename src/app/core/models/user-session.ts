import { iUserSession } from "@core/interfaces/iuser-session";

export class UserSession implements iUserSession{
    private _userSession: iUserSession

    constructor(userSession: iUserSession){
        this._userSession = userSession
    }

    get CodUsuarioSesion(): string{
        return this._userSession.CodUsuarioSesion
    }

    get NomUsuarioSesion(): string{
        return this._userSession.NomUsuarioSesion
    }

    get CodIdiomaSesion(): string{
        return this._userSession.NomUsuarioSesion
    }

    get CodEmpresaSesion(): string{
        return this._userSession.CodEmpresaSesion
    }

    get NomEmpresaSesion(): string{
        return this._userSession.NomEmpresaSesion
    }

    get CodVendedorSesion(): number{
        return this._userSession.CodVendedorSesion
    }

    get NomVendedorSesion(): string{
        return this._userSession.NomVendedorSesion
    }

    get CodAgenteSesion(): number{
        return this._userSession.CodAgenteSesion
    }

    get NomAgenteSesion(): string{
        return this._userSession.NomAgenteSesion
    }
}