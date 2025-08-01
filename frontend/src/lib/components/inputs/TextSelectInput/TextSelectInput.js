import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  MdRemoveCircle,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from 'react-icons/md';

import Divider from '../../Divider/Divider';
import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import FormikHelper from '../../../../utils/helper/FormikHelper';

import './TextSelectInput.scss';

class TextSelectInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      isOptionPanelOpen: false,
      value: props.inputValue,
    };
    this.optionsRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (JSON.stringify(props.options) !== JSON.stringify(prevProps.options)) {
      this.setOptions(props.options);
    }
    if (props.inputValue !== prevProps.inputValue) {
      this.setValue(props.inputValue);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setValue = (value) => {
    this.setState({ value });
  };

  setOptions = (options) => {
    this.setState({ options });
  };

  handleClickOutside = (event) => {
    const { props, state } = this;
    if (props.disable) return;
    if (state.isOptionPanelOpen) {
      if (
        this.optionsRef &&
        !this.optionsRef.current.contains(event.target) &&
        !this.inputRef.current.contains(event.target)
      ) {
        this.setIsOptionPanelOpen(false);
      }
    }
  };

  toggleOptionPanel = () => {
    const { state } = this;
    this.setIsOptionPanelOpen(!state.isOptionPanelOpen);
  };

  setIsOptionPanelOpen = (isOptionPanelOpen) => {
    const { props } = this;
    if (!props.disable && !props.display) {
      this.setState({ isOptionPanelOpen });
    }
  };

  filterOptions = (value) => {
    const { props } = this;
    const options = props.options.filter((option) =>
      option.text.includes(value),
    );
    this.setState({ options });
  };

  inputValue = () => {
    const { props, state } = this;
    if (!props.multiple) {
      const selectedItem = props.options.find(
        (option) => option.value === props.inputValue,
      );
      return selectedItem === undefined ? state.value : selectedItem.text;
    }
  };

  displayOptions = () => {
    const { props, state } = this;
    if (props.disable) return '';
    return state.isOptionPanelOpen ? (
      <div
        className={`options ${this.optionsClassname()}`}
        ref={this.optionsRef}
      >
        {state.options.length > 0 ? (
          state.options.map((option, index) => (
            <div
              key={option.value}
              onBlur={() => this.setIsOptionPanelOpen(false)}
            >
              {index !== 0 ? <Divider /> : ''}
              <ButtonDiv
                className={`option ${this.selectedClassname(
                  option.value,
                )} ${this.disableOptionClassname(
                  option.disable,
                )} ${this.warningOptionClassname(option.warning)}`}
                onClick={() => this.handleSelectOption(option.value)}
              >
                {option.text}
              </ButtonDiv>
            </div>
          ))
        ) : (
          <div onBlur={() => this.setIsOptionPanelOpen(false)}>
            <ButtonDiv className="option no-option">
              {props.language.textSelectInput.noOption}
            </ButtonDiv>
          </div>
        )}
      </div>
    ) : (
      ''
    );
  };

  zenClassname = () => {
    const { props } = this;
    return props.zenMode ? 'zen' : '';
  };

  disableOptionClassname = (disable) => (disable ? 'disable' : '');

  warningOptionClassname = (warning) => (warning ? 'warning' : '');

  displayClassname = () => {
    const { props } = this;
    return props.display ? 'display' : '';
  };

  optionsClassname = () => {
    const { props } = this;
    const input = this.inputRef.current;
    if (input !== null) {
      const inputBottom = input.getBoundingClientRect().bottom;
      return inputBottom > props.windowSize.height - 200 ? 'bottom' : '';
    }
    return '';
  };

  selectedClassname = (value) => {
    const { props } = this;
    if (props.inputValue === value) {
      return 'selected';
    }
    if (props.multiple && props.inputValue.includes(value)) {
      return 'multi-selected';
    }
    return '';
  };

  disableClassname = () => {
    const { props } = this;
    return props.disable ? 'disable' : '';
  };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  handleInputValueOnChanged = (event) => {
    const { props } = this;
    const { value } = event.target;
    if (!props.display && !props.disable) {
      if (!props.multiple) {
        this.setValue(value);
        if (props.freeInput) {
          props.setFieldValue(props.inputName, value);
        } else {
          const selectedItem = props.options.find(
            (option) => option.text === value,
          );

          if (selectedItem !== undefined) {
            props.setFieldValue(props.inputName, selectedItem.value);
          } else {
            props.setFieldValue(props.inputName, '');
          }
        }
      }
      this.filterOptions(value);
    }
  };

  handleSelectOption = (value) => {
    const { props } = this;
    if (!props.display && !props.disable) {
      if (props.multiple) {
        props.setFieldValue(props.inputName, [...props.inputValue, value]);
      } else {
        props.setFieldValue(props.inputName, value);
      }
      this.setIsOptionPanelOpen(false);
    }
  };

  handleInputOnFocus = () => {
    const { props } = this;
    if (!props.disable) this.setIsOptionPanelOpen(true);
  };

  removeItem = (value) => {
    const { props } = this;
    const newValue = props.inputValue.filter((item) => item !== value);
    props.setFieldValue(props.inputName, newValue);
  };

  valueName = (value) => {
    const { props } = this;
    const valueItem = props.options.find((item) => item.value === value);
    return valueItem === undefined ? '' : valueItem.text;
  };

  displayValueItem = () => {
    const { props } = this;
    return props.inputValue.map((item) => (
      <ButtonDiv
        className="value-button"
        onClick={() => this.removeItem(item)}
        key={item}
      >
        <div>{this.valueName(item)}</div>
        <MdRemoveCircle className="icon" />
      </ButtonDiv>
    ));
  };

  displayMultipleSelectedValue = () => {
    const { props } = this;
    if (props.multiple) {
      return props.inputValue.length !== 0 ? (
        <div className="selected-values">{this.displayValueItem()}</div>
      ) : (
        ''
      );
    }
    return '';
  };

  displayArrow = () => {
    const { isOptionPanelOpen } = this.state;
    return isOptionPanelOpen ? (
      <MdKeyboardArrowUp size={20} />
    ) : (
      <MdKeyboardArrowDown size={20} />
    );
  };

  handleKeyUp = (event) => {
    const { props } = this;
    props.onKeyUp(event, () => {
      this.setIsOptionPanelOpen(false);
    });
  };

  render() {
    const { props } = this;

    return (
      <div className={`text-select-input ${this.zenClassname()}`}>
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div>
        <div className="input-container">
          <div className="input-text-section">
            <input
              ref={this.inputRef}
              className={`form-input ${this.disableClassname()} ${this.displayClassname()}`}
              type="text"
              name={props.inputName}
              placeholder={props.inputPlaceholder}
              value={this.inputValue()}
              onChange={this.handleInputValueOnChanged}
              onFocus={this.handleInputOnFocus}
              onKeyUp={this.handleKeyUp}
              readOnly={props.disable}
              autoComplete="off"
            />
            <ButtonDiv
              className="trailing-icon"
              onClick={this.toggleOptionPanel}
            >
              {this.displayArrow()}
            </ButtonDiv>
          </div>
          {this.displayOptions()}
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
        {this.displayMultipleSelectedValue()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  windowSize: state.window.windowSize,
});

const mapDispatchToProps = (dispatch) => ({});

TextSelectInput.defaultProps = {
  inputPlaceholder: '',
  touched: {},
  errors: {},
  errorMessage: '',
  description: '',
  onKeyUp: FormikHelper.handleEnterKeyUp,
  disable: false,
  display: false,
  multiple: false,
  required: false,
  freeInput: false,
  zenMode: false,
};

TextSelectInput.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  windowSize: PropTypes.objectOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string,
  inputValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(Object),
  ]).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(Object).isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  errorMessage: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onKeyUp: PropTypes.func,
  disable: PropTypes.bool,
  display: PropTypes.bool,
  multiple: PropTypes.bool,
  required: PropTypes.bool,
  freeInput: PropTypes.bool,
  zenMode: PropTypes.bool,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TextSelectInput),
);
