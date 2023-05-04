export { iAuthentication } from './authentication/interfaces/iauthentication'
export { iAuthenticationSuccess } from './authentication/interfaces/iauthentication-success'
export { iAuthenticationError } from './authentication/interfaces/iauthentication-error'
export { Authentication } from './authentication/models/authentication'
export { AuthenticationConfig } from './authentication/models/authentication-config'
export { iAuthenticationConfig } from './authentication/interfaces/iauthentication-config'

export { AuthenticationService } from './authentication/services/authentication.service'
export { AuthenticationConfigService } from './authentication/services/authentication-config.service'

// export { loginErrorHandler, errorMessagesHandler } from './authentication/shared/authentication.utils'
export { loginErrorHandler } from './authentication/shared/authentication.utils'

export { CoreModule } from '@core/core.module'

export { iUserSession } from '@core/interfaces/iuser-session'
export { UserSession } from '@core/models/user-session'
