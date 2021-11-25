import { responceApiCodes } from "../Types/responceApiCodes"

export type authMeType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: responceApiCodes
    messages: Array<string> 
}

export type authLoginType = {
    data: {
        userId: number
    }
    resultCode: responceApiCodes
    messages: Array<string> 
}

export type authLogoutType = {
    data: {}
    resultCode: responceApiCodes
    messages: Array<string> 
}

