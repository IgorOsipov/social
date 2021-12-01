import { connect } from 'react-redux';
import { actions } from '../../../Redux/profileReducer';
import MyPosts from './MyPosts';


const mapStateToProps = (state) => {
    return {
        state: state.profilePage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (text) => {
            dispatch(actions.addPost(text))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;