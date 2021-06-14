
export const getUsers = (cPage = 1, pSize = 10) => {
        return fetch(`https://social-network.samuraijs.com/api/1.0/users?page=${cPage}&count=${pSize}`, {credentials: 'include'})
            .then(response => response.json())
}