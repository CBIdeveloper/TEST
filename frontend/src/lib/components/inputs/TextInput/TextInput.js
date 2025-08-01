import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import SelectInput from '../SelectInput/SelectInput';
import FormikHelper from '../../../../utils/helper/FormikHelper';

import './TextInput.scss';

class TextInput extends React.PureComponent {
  disableClassname = () => {
    const { props } = this;
    return props.disable ? 'disable' : '';
  };

  displayClassname = () => {
    const { props } = this;
    return props.display ? 'display' : '';
  };

  zenModeClassname = () => {
    const { props } = this;
    return props.zenMode ? 'zen' : '';
  };

  handleOnChange = (event) => {
    const { props } = this;
    if (!props.display && !props.disable) {
      props.inputOnChange(event);
    }
  };

  displayInput = () => {
    const { props } = this;
    if (props.inputType === 'textarea') {
      return (
        <textarea
          ref={props.inputRef}
          className={`form-input textarea ${this.disableClassname()} ${this.fullClassname()} ${this.displayClassname()} ${this.mediumClassname()}`}
          name={props.inputName}
          placeholder={props.inputPlaceholder}
          value={props.inputValue}
          onChange={this.handleOnChange}
          onKeyUp={props.onKeyUp}
          readOnly={props.disable}
          autoComplete="off"
        />
      );
    }
    if (props.inputType === 'number') {
      return (
        <input
          ref={props.inputRef}
          className={`form-input ${this.disableClassname()} ${this.fullClassname()} ${this.displayClassname()} ${this.mediumClassname()}`}
          type="text"
          inputMode="numeric"
          name={props.inputName}
          placeholder={props.inputPlaceholder}
          value={props.inputValue}
          onChange={(event) => {
            if (/^(\d*)([,.]\d{0,5})?$/.test(event.target.value)) {
              this.handleOnChange(event);
            }
          }}
          onKeyUp={props.onKeyUp}
          readOnly={props.disable}
          autoComplete="off"
        />
      );
    }
    return (
      <input
        ref={props.inputRef}
        className={`form-input ${this.disableClassname()} ${this.fullClassname()} ${this.displayClassname()} ${this.mediumClassname()}`}
        type={props.inputType}
        name={props.inputName}
        placeholder={props.inputPlaceholder}
        value={props.inputValue}
        onChange={this.handleOnChange}
        onKeyUp={props.onKeyUp}
        readOnly={props.disable}
        autoComplete="off"
      />
    );
  };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  fullClassname = () => {
    const { props } = this;
    return props.full ? 'full' : '';
  };

  mediumClassname = () => {
    const { props } = this;
    return props.medium ? 'medium' : '';
  };

  render() {
    const { props } = this;

    const errorMessage = getNestedValue(props.errors, props.errorsName); // 動態解析錯誤訊息
    const isTouched = getNestedValue(props.touched, props.touchedName);

    return (
      <div className={`text-input ${this.zenModeClassname()}`}>
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div>
        <div className="is-plan-sponsor">{props.inputTitle}</div>
        <div className={`input-container ${this.fullClassname()}`}>
          <div className="input-text-section">
            {this.displayInput()}
            {props.trailingIcon === '' ? (
              ''
            ) : (
              <ButtonDiv
                className="trailing-icon"
                onClick={props.iconOnClick}
                tabIndex={-1}
              >
                {props.trailingIcon}
              </ButtonDiv>
            )}
          </div>
          <div className="message-section">
            {props.touched[props.inputName] &&
              props.errors[props.inputName] && (
                <div className="error-message">
                  {props.errors[props.inputName]}
                </div>
              )}
            {isTouched && errorMessage && <div className="error-message">{errorMessage}</div>}
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

const getNestedValue = (obj, path) => {
  if (!path) {
    // 如果 path 是空字串、null 或 undefined，直接返回 undefined
    return undefined;
  }

  return path
    .split(/[.[\]]+/) // 將點號和方括號作為分隔符
    .filter(Boolean)  // 過濾掉空值
    .reduce((acc, key) => {
      if (acc === undefined || acc === null) {
        return undefined; // 如果中途找不到值，直接返回 undefined
      }
      if (Array.isArray(acc) && !isNaN(key)) {
        // 如果是陣列且 key 是數字，按索引訪問
        return acc[Number(key)];
      }
      // 否則作為物件的屬性訪問
      return acc[key];
    }, obj);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

TextInput.defaultProps = {
  inputPlaceholder: '',
  inputType: 'text',
  touched: {},
  touchedName: '',
  errors: {},
  errorsName: '',
  errorMessage: '',
  description: '',
  trailingIcon: '',
  iconOnClick: () => { },
  onKeyUp: FormikHelper.handleEnterKeyUp,
  disable: false,
  display: false,
  required: false,
  zenMode: false,
  full: false,
  medium: false,
  inputRef: () => { },
};

TextInput.propTypes = {
  title: PropTypes.any.isRequired,
  inputTitle: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputOnChange: PropTypes.func.isRequired,
  inputType: PropTypes.string,
  touched: PropTypes.objectOf(Object),
  touchedName: PropTypes.string,
  errors: PropTypes.objectOf(Object),
  errorsName: PropTypes.string,
  errorMessage: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  trailingIcon: PropTypes.node,
  iconOnClick: PropTypes.func,
  onKeyUp: PropTypes.func,
  disable: PropTypes.bool,
  display: PropTypes.bool,
  required: PropTypes.bool,
  full: PropTypes.bool,
  medium: PropTypes.bool,
  zenMode: PropTypes.bool,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);
