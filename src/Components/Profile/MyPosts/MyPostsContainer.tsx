import { connect } from 'react-redux';
import { actions } from '../../../Redux/profileReducer';
import { AppStateType } from '../../../Redux/store';
import MyPosts from './MyPosts';


const mapStateToProps = (state: AppStateType) => {
    return {
        state: state.profilePage
    }
}

const MyPostsContainer = connect(mapStateToProps, {addPost: actions.addPost})(MyPosts)

export default MyPostsContainer;