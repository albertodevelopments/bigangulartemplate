import { iAuthenticationError } from "../interfaces/iauthentication-error";

export function loginErrorHandler(error: number): iAuthenticationError{
    let errorResponse: iAuthenticationError
    
    switch(error){
        case 401:
            errorResponse = {
                'errorCode': error,
                'errorMessage': 'login.error.401'
            }
            break;
        default:
            errorResponse = {
                'errorCode': error,
                'errorMessage': 'global.error.unknown'
            }
    }

    return errorResponse
}