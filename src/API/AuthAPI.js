export default class AuthAPI {

    constructor(){
        this._apiBase = 'https://social-network.samuraijs.com/api/1.0/'
    }


    authorization = async () => {
        const res = await fetch(`${this._apiBase}auth/me`, {
            credentials: 'include'
        })
        return res.json()
    }

}