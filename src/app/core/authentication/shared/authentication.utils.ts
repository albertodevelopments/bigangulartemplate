import { iAuthenticationError } from "../interfaces/iauthentication-error";

export function loginErrorHandler(error: number): iAuthenticationError{
    let errorResponse: iAuthenticationError
    
    switch(error){
        case 401:
            errorResponse = {
                'errorCode': error,
                'errorMessage': 'label.error.401'
            }
            break;
        default:
            errorResponse = {
                'errorCode': error,
                'errorMessage': 'label.error.unknown'
            }
    }

    return errorResponse
}