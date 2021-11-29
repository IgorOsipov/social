import { profileType } from "../Types/types"
import { apiResponceType, authLoginResponceType, authMeResponceType, getUsersResponceType, noDataResponceType, savePhotoResponceType, } from "./SamApiTypes";


export default class SamServices {
    _apiBase: string;
    _apiKey: string;

    constructor(){
        this._apiBase = 'https://social-network.samuraijs.com/api/1.0/';
        this._apiKey = '6f029e5f-48f9-458c-ac33-6b805ca9e34e';
    }

    getResoure = async (url: string) => {
        const res = await fetch(`${this._apiBase}${url}`, {
            credentials: 'include'
        });

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return res.json();
    }

    getUserProfile = async (id: number) => {
        const res = await this.getResoure(`profile/${id}`);
        return res as Promise<profileType>;
    }

    getStatus = async (userId: number) => {
        const res = await this.getResoure(`profile/status/${userId}`);
        return res as Promise<string>;
    }

    getCaptcha = async () => {
        const res = await this.getResoure(`security/get-captcha-url`);
        return res as Promise<{url: string}>;
    }

    getUsers = async (page: number, pageSize: number) => {
        const res = await this.getResoure(`users?page=${page}&count=${pageSize}`);
        return res as Promise<getUsersResponceType>;
    }

    updateStatus = async (status: string) => {
        const res = await fetch(`https://social-network.samuraijs.com/api/1.0/profile/status`, {
            method: 'put',
            body: JSON.stringify({
                status: status
            }),
            headers: {
                'API-KEY': this._apiKey,
                'Content-type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        });
        return res.json() as Promise<noDataResponceType & apiResponceType>;
    }

    authorization = async () => {
        const res = await fetch(`${this._apiBase}auth/me`, {
            credentials: 'include'
        });
        return res.json() as Promise<authMeResponceType & apiResponceType>;
    }

    login = async (email: string, password: string, rememberMe = false, captcha: null | string = null) => {
        const res = await fetch(`https://social-network.samuraijs.com/api/1.0/auth/login`, {
            method: 'post',
            body: JSON.stringify({
                email: email,
                password: password,
                rememberMe: rememberMe,
                captcha: captcha
            }),
            headers: {
                "API-KEY": this._apiKey,
                'Content-type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        });

        return res.json() as Promise<authLoginResponceType & apiResponceType>;
    } 

    logout = async () => {
        const res = await fetch(`https://social-network.samuraijs.com/api/1.0/auth/login`, {
            method: 'delete',
            headers: {
                "API-KEY": this._apiKey
            },
            credentials: 'include'
        });

        return res.json() as Promise<noDataResponceType & apiResponceType>;
    }

    followUser = async (userId: number) => {
        const res = await fetch(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
            method: 'post',
            headers: {
                "API-KEY": this._apiKey
            },
            credentials: 'include'
        });

        return res.json() as Promise<noDataResponceType & apiResponceType>;
    }

    unfollowUser = async (userId: number) => {
        const res = await fetch(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
            method: 'delete',
            headers: {
                "API-KEY": this._apiKey
            },
            credentials: 'include'
        });

        return res.json() as Promise<noDataResponceType & apiResponceType>;
    }

    savePhoto = async (image: any) => {
        const formData = new FormData(); 
        formData.append("image", image);

        const res = await fetch(`https://social-network.samuraijs.com/api/1.0/profile/photo`, {
            method: 'put',
            body: formData,
            headers: {
                'API-KEY': this._apiKey
            },
            credentials: 'include'
        });
        return res.json() as Promise<savePhotoResponceType & apiResponceType>;
    }

    saveProfile = async (profile: profileType) => {
        const res = await fetch(`https://social-network.samuraijs.com/api/1.0/profile`, {
            method: 'put',
            body: JSON.stringify(profile),
            headers: {
                'API-KEY': this._apiKey,
                'Content-type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        });
        return res.json() as Promise<noDataResponceType & apiResponceType>;
    }
    
}