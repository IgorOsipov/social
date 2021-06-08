import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../Redux/dialogsReducer';
import { connect } from 'react-redux';
import Dialog from './Dialog';


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

const DialogContainer = connect(mapStateToProps, mapDispatchToProps)(Dialog);

export default DialogContainer;