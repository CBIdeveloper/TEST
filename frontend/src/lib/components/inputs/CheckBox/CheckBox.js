import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import SelectInput from '../SelectInput/SelectInput';
import FormikHelper from '../../../../utils/helper/FormikHelper';

import './CheckBox.scss';

class CheckBox extends React.PureComponent {
  handleCategoryOnChange = (event) => {
    const { props } = this;
    props.setFieldValue(props.inputName, event.target.value);
  };
  render() {
    const { props } = this;
    return (
      <ButtonDiv
        className="trailing-icon-two"
        name={props.inputName}
        onClick={props.iconOnClick}
        inputOnChange={this.handleCategoryOnChange}
        value={props.inputValue}
        tabIndex={-1}
      >
        {props.trailingIcon}
      </ButtonDiv>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

CheckBox.defaultProps = {
  trailingIcon: '',
  iconOnClick: () => {},
  inputRef: () => {},
};

CheckBox.propTypes = {
  inputName: PropTypes.string,
  trailingIcon: PropTypes.node,
  iconOnClick: PropTypes.func,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setFieldValue: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBox);
