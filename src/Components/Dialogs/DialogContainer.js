import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../Redux/dialogsReducer';
import { connect } from 'react-redux';
import Dialog from './Dialog';
import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import { compose } from 'redux';


const mapStateToProps = (state) => {
    return {
        state: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onMessageChange: (text) => {
            dispatch(updateNewMessageTextActionCreator(text))
        },
        onButtonClick: () => {
            dispatch(addMessageActionCreator())
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialog)
