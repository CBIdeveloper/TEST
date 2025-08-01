import React from 'react';

import Divider from "../../../../../lib/components/Divider/Divider";
import ButtonDiv from "../../../../../lib/components/ButtonDiv/ButtonDiv";
import PropTypes from "prop-types";
import store from "../../../../../store/store";
import {closeDialogModal} from "../../../../../store/modal/slice";

import "./PropsConfirmModal.scss"
import {setLoading} from "../../../../../store/loading/slice";

class PropsConfirmModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.language = store.getState().language.languageInfo.languageObject.modal;
        this.props = props;
    }

    getModalTitle = () => this.props.title;

    getModalContent = () => (
        <div className="confirm-modal">
            <div className="message">{this.props.Message}</div>
            <Divider/>
            <div className="button-group">
                <ButtonDiv className="cancel-button" onClick={this.onClose}>
                    {this.language.confirmModal.cancel}
                </ButtonDiv>
                <ButtonDiv className="confirm-button" onClick={this.confirm}>
                    {this.language.confirmModal.confirm}
                </ButtonDiv>
            </div>
        </div>
    )

    getHeaderClassname = () => '';

    onClose = () => {
        store.dispatch(setLoading(false));
        store.dispatch(closeDialogModal());
    };

    confirm = () => {
        store.dispatch(setLoading(true));
        this.props.confirmFunction(this.onClose);
    };
}

PropsConfirmModal.propTypes = {
    title: PropTypes.string.isRequired,
    Message: PropTypes.string.isRequired,
    confirmFunction: PropTypes.func,
}

export default PropsConfirmModal