export type photosType = {
    small: string
    large: string
}

export type postsType = {
    id: number
    message: string
}
export type profileContactsType={
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: profileContactsType
    photos: photosType
    aboutMe: string
}

export type usersType = {
    id: number
    name: string
    status: string
    photos : photosType
    followed: boolean
}