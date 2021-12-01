import profileReducer, { actions } from "./profileReducer";

const state = {
    posts: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'World' },
        { id: 3, message: 'Lol' },
        { id: 4, message: 'Kek' }
    ],
    profile: null,
    status: '',
    preload: false
};

const newMessage = 'hello';

it('The length of posts should increase', () => {
    const action = actions.addPost(newMessage);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(5);
})

it(`Message of new post should be - ${newMessage}`, () => {
    const action = actions.addPost(newMessage);
    let newState = profileReducer(state, action);
    expect(newState.posts[4].message).toBe(newMessage);
})

it('After deleting length of posts should decrease', () => {
    const action = actions.deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
})

it('After deleting length of posts should not decrease if id is incorrect', () => {
    const action = actions.deletePost(1000);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
})