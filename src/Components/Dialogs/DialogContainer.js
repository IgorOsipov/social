import { addMessageActionCreator } from '../../Redux/dialogsReducer';
import { connect } from 'react-redux';
import Dialog from './Dialog';
//import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import { compose } from 'redux';


const mapStateToProps = (state) => {
    return {
        state: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessage) => {
            dispatch(addMessageActionCreator(newMessage))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    //withAuthRedirect,
)(Dialog)
