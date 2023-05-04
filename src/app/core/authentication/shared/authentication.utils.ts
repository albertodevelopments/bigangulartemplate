import { iAuthenticationError } from "@core/index"
// import { labels } from "@data/consts"

export function loginErrorHandler(error: number): iAuthenticationError{
    let errorResponse: iAuthenticationError
    
    switch(error){
        case 401:
            errorResponse = {
                'errorCode': error,
                'errorMessage': 'login.error.401'
            }
            break
        case 403:
            errorResponse = {
                'errorCode': error,
                'errorMessage': 'auth.error.403'
            }
            break    
        default:
            errorResponse = {
                'errorCode': 500,
                'errorMessage': 'global.error.unknown'
            }
            break
    }

    return errorResponse
}

// export function errorMessagesHandler(errorMessage: string){
//     let errorStatus: number

    
//     const fullErrorMessage = errorMessage.substring(errorMessage.indexOf(':')).trim()

//     console.log(fullErrorMessage);

//     if(errorMessage === fullErrorMessage)
//         console.log(errorMessage);
    

//     switch(errorMessage){
//         case labels.AUTHORIZATION_FAILED:
//             errorStatus = 403
//             console.log(errorStatus);
//             break
//         default:
//             errorStatus = 500
//             break
//     }   

//     return errorStatus
// }