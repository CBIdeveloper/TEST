import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../../ButtonDiv/ButtonDiv';

import './SelectItem.scss';

import radioNone from '../../../../../assets/images/icons/radio_none.png';
import radioSelected from '../../../../../assets/images/icons/radio_selected.png';
import checkboxNone from '../../../../../assets/images/icons/checkbox_none.png';
import checkboxChecked from '../../../../../assets/images/icons/checkbox_check.png';

class SelectItem extends React.PureComponent {
    displayCheckbox = () => {
        const {props} = this;
        return props.selected ? (
            <img src={this.selectedImageSrc()} className="icon" alt="radio"/>
        ) : (
            <img src={this.noneImageSrc()} className="icon" alt="radio"/>
        );
    };

    selectedImageSrc = () => {
        const {props} = this;
        return props.singleSelection ? radioSelected : checkboxChecked;
    };

    noneImageSrc = () => {
        const {props} = this;
        return props.singleSelection ? radioNone : checkboxNone;
    };

    handleCheckboxOnClick = () => {
        const {props} = this;
        props.handleCheckboxOnClick();
    };

    render() {
        const {props} = this;
        const {disabled} = props;
        return (
            <ButtonDiv className="select-item" onClick={this.handleCheckboxOnClick} disabled={disabled}>
                {this.displayCheckbox()}
                <div className="item-name">{props.name}</div>
            </ButtonDiv>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

SelectItem.defaultProps = {
    singleSelection: false,
    disabled: false,
};

SelectItem.propTypes = {
    selected: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    handleCheckboxOnClick: PropTypes.func.isRequired,
    singleSelection: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectItem);
