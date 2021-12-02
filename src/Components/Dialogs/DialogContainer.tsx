import { actions } from '../../Redux/dialogsReducer';
import { connect } from 'react-redux';
import Dialog from './Dialog';
import { withAuthRedirect } from '../HOC/WithAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/store';


const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose(
    connect(mapStateToProps, { sendMessage: actions.addMessage }),
    withAuthRedirect
)(Dialog)
