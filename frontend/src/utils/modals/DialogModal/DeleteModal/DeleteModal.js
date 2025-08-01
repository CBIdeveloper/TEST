import React from 'react';

import DialogModal from '../DialogModal';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';
import Divider from '../../../../lib/components/Divider/Divider';

import './DeleteModal.scss';
import store from "../../../../store/store";
import {setLoading} from "../../../../store/loading/slice";

class DeleteModal extends DialogModal {
    constructor(deleteFunction) {
        super();
        this.deleteFunction = deleteFunction;
    }

    getModalTitle = () => this.language.deleteModal.title;

    getModalContent = () => (
        <div className="delete-modal">
            <div className="message">
                {this.language.deleteModal.confirmDeleteMessage}
            </div>
            <Divider/>
            <div className="button-group">
                <ButtonDiv className="cancel-button" onClick={this.onClose}>
                    {this.language.deleteModal.cancel}
                </ButtonDiv>
                <ButtonDiv className="delete-button" onClick={this.delete}>
                    {this.language.deleteModal.delete}
                </ButtonDiv>
            </div>
        </div>
    );

    delete = () => {
        store.dispatch(setLoading(true));
        this.deleteFunction(() => {
            store.dispatch(setLoading(false));
            this.onClose();
        });
    };

    getHeaderClassname = () => 'red';
}

export default DeleteModal;
