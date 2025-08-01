import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextInput from '../TextInput/TextInput';

import FormikHelper from '../../../../utils/helper/FormikHelper';

import './PhoneInput.scss';

class PhoneInput extends React.PureComponent {
  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  displayClassname = () => {
    const { props } = this;
    return props.display ? 'display' : '';
  };

  inputPlaceholder = (value) => {
    const { props } = this;
    return props.display ? '-' : value;
  };

  handlePhoneOnChange = (event) => {
    const { props } = this;
    props.setFieldValue(props.inputName, event.target.value);
  };

  handleExtensionOnChange = (event) => {
    const { props } = this;
    props.setFieldValue(props.extensionInputName, event.target.value);
  };

  displayInput = () => {
    const { props, state } = this;
    return (
      <div className="phone-input-container">
        <div className="phone-number">
          <TextInput
            title=""
            inputType="text"
            inputName={props.inputName}
            inputPlaceholder={props.inputPlaceholder}
            inputValue={props.inputValue}
            inputOnChange={this.handlePhoneOnChange}
            touched={props.touched}
            errors={props.errors}
            display={props.display}
            zenMode
          />
        </div>
        <div className="extension-number">
          <div>{`${props.extensionTitle}：`}</div>
          <TextInput
            title=""
            inputType="text"
            inputName={props.extensionInputName}
            inputPlaceholder={props.extensionInputPlaceholder}
            inputValue={props.extensionInputValue}
            inputOnChange={this.handleExtensionOnChange}
            touched={props.touched}
            errors={props.errors}
            display={props.display}
            zenMode
          />
        </div>
      </div>
    );
  };

  render() {
    const { props } = this;

    return (
      <div className="phone-input">
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div>
        <div className="input-container">
          {this.displayInput()}
          <div className="message-section">
            {props.touched[props.inputName] &&
              props.errors[props.inputName] && (
                <div className="error-message">
                  {props.errors[props.inputName]}
                </div>
            )}
            {props.errorMessage && (
              <div className="error-message">{props.errorMessage}</div>
            )}
            {props.description !== '' && (
              <div className="input-description">{props.description}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

PhoneInput.defaultProps = {
  inputPlaceholder: '',
  extensionInputPlaceholder: '',
  touched: {},
  errors: {},
  errorMessage: '',
  description: '',
  onKeyUp: FormikHelper.handleEnterKeyUp,
  disable: false,
  display: false,
  required: false,
};

PhoneInput.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  inputPlaceholder: PropTypes.string,
  extensionTitle: PropTypes.string.isRequired,
  extensionInputName: PropTypes.string.isRequired,
  extensionInputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  extensionInputPlaceholder: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  errorMessage: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onKeyUp: PropTypes.func,
  disable: PropTypes.bool,
  display: PropTypes.bool,
  required: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneInput);
