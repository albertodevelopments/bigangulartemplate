import { UserConfigInterface } from "../interfaces/user-config.interface"

export class UserConfig implements UserConfigInterface{

    private _userConfig: UserConfigInterface

    constructor(userConfig: UserConfigInterface){
        this._userConfig = userConfig
    }

    get language(): string{
        return this._userConfig.language
    }
    
}
