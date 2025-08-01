import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SelectItem from './SelectItem/SelectItem';

import './MultipleSelectInput.scss';

class MultipleSelectInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      previousInputValue: null,
    };
  }

  isItemSelected = (value) => {
    const { props, state } = this;
    if (props.arrayValue) {
      return value.every((item) => props.inputValue.includes(item));
    }
    return props.singleSelection
      ? props.inputValue === value
      : props.inputValue.includes(value);
  };

  displayOptions = () => {
    const { props } = this;
    return props.options.map((option) => (
      <SelectItem
        key={option.value}
        selected={this.isItemSelected(option.value)}
        name={option.text}
        handleCheckboxOnClick={() => this.handleOptionOnClick(option.value)}
        singleSelection={props.singleSelection}
        disabled={option.disabled}
      />
    ));
  };

  handleOptionOnClick = (value) => {
    const { props, state } = this;
    if (!props.display) {
      if (props.singleSelection) {
        if (!value.disabled) {
          if (props.inputValue === value) {
            props.setFieldValue(props.inputName, state.previousInputValue);
            this.setState({ previousInputValue: null });
          } else {
            this.setState({ previousInputValue: props.inputValue });
            props.setFieldValue(props.inputName, value);
          }
        }
      } else {
        let newValue;
        if (props.arrayValue) {
          if (this.isItemSelected(value)) {
            newValue = props.inputValue.filter((item) => !value.includes(item));
          } else {
            newValue = [...props.inputValue, ...value];
          }
        } else if (this.isItemSelected(value)) {
          newValue = props.inputValue.filter((item) => item !== value);
        } else {
          newValue = [...props.inputValue, value];
        }
        props.setFieldValue(props.inputName, newValue);
      }
    }
  };

  horizontalClassname = () => {
    const { props } = this;
    return props.horizontal ? 'horizontal' : '';
  };

  zenModeClassname = () => {
    const { props } = this;
    return props.zenMode ? 'zen' : '';
  };

  displayClassname = () => {
    const { props } = this;
    return props.display ? 'display' : '';
  };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  render() {
    const { props } = this;

    const errorMessage = getNestedValue(props.errors, props.errorsName); // 動態解析錯誤訊息
    const isTouched = getNestedValue(props.touched, props.touchedName);

    return (
      <div className={`multiple-select-input ${this.zenModeClassname()}`}>
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div>
        <div className="option-section">
          <div className="column">
            <span
              className={`select-container ${this.horizontalClassname()} ${this.displayClassname()}`}
            >
              {this.displayOptions()}
            </span>
            {props.trailingIcon === '' ? (
              ''
            ) : (
              <div className="trailing-icon">{props.trailingIcon}</div>
            )}
          </div>
          {props.touched[props.inputName] && props.errors[props.inputName] && (
            <div className="error-message">{props.errors[props.inputName]}</div>
          )}
          {isTouched && errorMessage && <div className="error-message">{errorMessage}</div>}
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

MultipleSelectInput.defaultProps = {
  touched: {},
  errors: {},
  trailingIcon: '',
  singleSelection: false,
  arrayValue: false,
  horizontal: false,
  required: false,
  zenMode: false,
  display: false,
};

MultipleSelectInput.propTypes = {
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.oneOfType([
    PropTypes.arrayOf(Object),
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  options: PropTypes.arrayOf(Object).isRequired,
  setFieldValue: PropTypes.func,
  touched: PropTypes.objectOf(Object),
  touchedName: PropTypes.string,
  errors: PropTypes.objectOf(Object),
  errorsName: PropTypes.string,
  trailingIcon: PropTypes.node,
  singleSelection: PropTypes.bool,
  arrayValue: PropTypes.bool,
  horizontal: PropTypes.bool,
  required: PropTypes.bool,
  zenMode: PropTypes.bool,
  display: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultipleSelectInput);
