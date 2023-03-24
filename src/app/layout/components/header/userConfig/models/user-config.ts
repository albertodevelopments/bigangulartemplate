import { iUserConfig } from "../interfaces/iuser-config"

export class UserConfig implements iUserConfig{

    private _userConfig: iUserConfig

    constructor(userConfig: iUserConfig){
        this._userConfig = userConfig
    }

    get language(): string{
        return this._userConfig.language
    }
    
}
