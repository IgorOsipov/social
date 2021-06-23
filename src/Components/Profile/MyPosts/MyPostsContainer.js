import { connect } from 'react-redux';
import { addPost, updateNewPostTextActionCreator } from '../../../Redux/profileReducer';
import MyPosts from './MyPosts';


const mapStateToProps = (state) => {
    return {
        state: state.profilePage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (text) => {
            dispatch(addPost(text))
        },
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextActionCreator(text))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;