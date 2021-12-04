import usersReducer, { actions, initialStateType } from "./usersReducer";

let state: initialStateType;
beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Abra',
                followed: false,
                photos: {
                    large: null,
                    small: null
                },
                status: "hello"
            },
            {
                id: 1,
                name: 'BAbra',
                followed: false,
                photos: {
                    large: null,
                    small: null
                },
                status: "hello2"
            },
            {
                id: 2,
                name: 'ShwAbra',
                followed: true,
                photos: {
                    large: null,
                    small: null
                },
                status: "hello3"
            },
            {
                id: 3,
                name: 'AbraCadabra',
                followed: true,
                photos: {
                    large: null,
                    small: null
                },
                status: "hello4"
            }
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [] //array of users id
    }
})



test("Follow User", () => {

    const newState = usersReducer(state, actions.follow(1));

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test("Unffollow User", () => {

    const newState = usersReducer(state, actions.unfollow(3));

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
});