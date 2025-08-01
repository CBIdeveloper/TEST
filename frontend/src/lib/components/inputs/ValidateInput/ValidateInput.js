import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import TextInput from '../TextInput/TextInput';

import ApiService from '../../../../utils/api/ApiService';
import FormikHelper from '../../../../utils/helper/FormikHelper';

import './ValidateInput.scss';

import refresh from '../../../../assets/images/icons/refresh.png';

class ValidateInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { captchaImage: null };
    this.captchaId = 'validation-code';
  }

  componentDidMount() {
    this.initValidationCode();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { props } = this;
    if (props.validateTimestamp !== prevProps.validateTimestamp) {
      this.initValidationCode();
    }
  }

  setCaptchaImage = (captchaImage) => {
    this.setState({ captchaImage });
  };

  initValidationCode = () => {
    ApiService.captcha.getCaptchaImage().then((response) => {
      const urlCreator = window.URL || window.webkitURL;
      this.setCaptchaImage(urlCreator.createObjectURL(response.data));
    });
  };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  fullClassname = () => {
    const { props } = this;
    return props.full ? 'full' : '';
  };

  render() {
    const { props, state } = this;

    return (
      <div className="validate-input">
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.language.validateInput.title}
        </div>

        <div className={`input-container ${this.fullClassname()}`}>
          <div className="input-text-section">
            <TextInput
              title=""
              inputName={props.inputName}
              inputValue={props.inputValue}
              inputPlaceholder={props.language.validateInput.placeholder}
              inputOnChange={(event) =>
                props.setFieldValue(props.inputName, event.target.value)
              }
              onKeyUp={props.onKeyUp}
              zenMode
            />
            {state.captchaImage === null ? (
              ''
            ) : (
              <img
                id={this.captchaId}
                alt="captcha"
                className="validation-code"
                src={state.captchaImage}
                width="100"
                height="40"
              />
            )}
            <ButtonDiv
              className="refresh-icon-container"
              onClick={this.initValidationCode}
            >
              <img className="refresh-icon" src={refresh} alt="refresh" />
            </ButtonDiv>
          </div>
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

ValidateInput.defaultProps = {
  touched: {},
  errors: {},
  errorMessage: '',
  description: '',
  validateTimestamp: '',
  onKeyUp: FormikHelper.handleEnterKeyUp,
  required: false,
  full: false,
};

ValidateInput.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  errorMessage: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  validateTimestamp: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.objectOf(Object),
  ]),
  onKeyUp: PropTypes.func,
  required: PropTypes.bool,
  full: PropTypes.bool,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ValidateInput),
);
