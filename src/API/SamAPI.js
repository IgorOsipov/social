export default class SamServices {

    constructor(){
        this._apiBase = 'https://social-network.samuraijs.com/api/1.0/'
        this._apiKey = '6f029e5f-48f9-458c-ac33-6b805ca9e34e'
    }

    getResoure = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`, {
            credentials: 'include'
        })

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }

        return res.json()
    }

    getUserProfile = async (id) => {
        const res = await this.getResoure(`profile/${id}`)
        return res
    }

    getUsers = async (page, pageSize) => {
        const res = await this.getResoure(`users?page=${page}&count=${pageSize}`)
        return res
    }

    authorization = async () => {
        const res = await fetch(`${this._apiBase}auth/me`, {
            credentials: 'include'
        })
        return res.json()
    }

    followUser = async (userId) => {
        const res = await fetch(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
            method: 'post',
            headers: {
                "API-KEY": this._apiKey
            },
            credentials: 'include'
        })

        return res.json()
    }

    unfollowUser = async (userId) => {
        const res = await fetch(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
            method: 'delete',
            headers: {
                "API-KEY": this._apiKey
            },
            credentials: 'include'
        })

        return res.json()
    }
}