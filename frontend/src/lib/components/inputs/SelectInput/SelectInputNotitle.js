import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import Divider from '../../Divider/Divider';

import './SelectInput.scss';

class SelectInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isOptionPanelOpen: false, optionsRef: null };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { state } = this;
    if (state.isOptionPanelOpen && state.optionsRef !== prevState.optionsRef) {
      this.scrollToSelectItem();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setOptionsRef = (optionsRef) => {
    this.setState({ optionsRef });
  };

  setIsOptionPanelOpen = (isOptionPanelOpen) => {
    const { props } = this;
    if (!props.disable && !props.display) {
      this.setState({ isOptionPanelOpen });
    }
  };

  handleClickOutside = (event) => {
    const { props, state } = this;
    if (props.disable) return;
    if (state.isOptionPanelOpen) {
      if (
        state.optionsRef &&
        !state.optionsRef.contains(event.target) &&
        !this.inputRef.current.contains(event.target)
      ) {
        this.setIsOptionPanelOpen(false);
      }
    }
  };

  toggleOptionPanel = () => {
    const { props } = this;
    const { isOptionPanelOpen } = this.state;
    if (!props.disable && !props.display) {
      this.setState({ isOptionPanelOpen: !isOptionPanelOpen });
    }
  };

  handleSelectOption = (value) => {
    const { props } = this;
    props.setFieldValue(props.inputName, value);
    this.toggleOptionPanel();
  };

  scrollToSelectItem = () => {
    const { state } = this;
    const options = state.optionsRef;
    const optionList = options.children;
    const selectItem = optionList.namedItem('selected');
    if (selectItem) {
      const { scrollHeight } = options;
      const { offsetTop } = selectItem;
      if (offsetTop >= scrollHeight) {
        options.scrollTop = scrollHeight;
      } else {
        options.scrollTop = offsetTop;
      }
    }
  };

  displayArrow = () => {
    const { isOptionPanelOpen } = this.state;
    const { display } = this.props;
    if (display) return '';
    return isOptionPanelOpen ? (
      <MdKeyboardArrowUp size={20} />
    ) : (
      <MdKeyboardArrowDown size={20} />
    );
  };

  displayOptions = () => {
    const { props, state } = this;
    return state.isOptionPanelOpen ? (
      <div
        className={`options ${this.optionsClassname()}`}
        ref={this.setOptionsRef}
      >
        {props.placeHolder ? (
          <div>
            <ButtonDiv
              className="placeholder"
              onClick={() => this.handleSelectOption(props.placeHolderValue)}
            >
              {props.inputPlaceholder}
            </ButtonDiv>
          </div>
        ) : (
          ''
        )}
        {props.options.map((option, index) => (
          <div
            key={option.text}
            name={props.inputValue === option.value ? 'selected' : ''}
          >
            {props.placeHolder || index !== 0 ? <Divider /> : ''}
            <ButtonDiv
              className={`option ${this.selectedClassname(option.value)}`}
              onClick={() => this.handleSelectOption(option.value)}
            >
              {option.text}
            </ButtonDiv>
          </div>
        ))}
      </div>
    ) : (
      ''
    );
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
    return props.inputValue === value ? 'selected' : '';
  };

  disableClassname = () => {
    const { props } = this;
    return props.disable ? 'disable' : '';
  };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  zenClassname = () => {
    const { props } = this;
    return props.zenMode ? 'zen' : '';
  };

  displayClassname = () => {
    const { props } = this;
    return props.display ? 'display' : '';
  };

  selectValue = () => {
    const { props } = this;
    const selectedOption = props.options.find(
      (option) => option.value === props.inputValue,
    );
    return selectedOption === undefined ? '' : selectedOption.text;
  };

  render() {
    const { props } = this;

    const errorMessage = getNestedValue(props.errors, props.errorsName); // 動態解析錯誤訊息
    const isTouched = getNestedValue(props.touched, props.touchedName);

    // console.log(this.selectValue())
    return (
      <div className={`select-input ${this.zenClassname()}`}>
        {/* <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div> */}
        <div className="select-container">
          <div className="select-input-section">
            <div className="select-input-container">
              <input
                ref={this.inputRef}
                readOnly
                className={`form-input ${this.disableClassname()} ${this.displayClassname()}`}
                name={props.inputName}
                placeholder={props.inputPlaceholder}
                value={this.selectValue()}
                onClick={this.toggleOptionPanel}
              />
              <ButtonDiv className="arrow" onClick={this.toggleOptionPanel}>
                {this.displayArrow()}
              </ButtonDiv>
              {this.displayOptions()}
            </div>
            {props.trailingInput === '' ? (
              ''
            ) : (
              <div className="trailing-input">{props.trailingInput}</div>
            )}
          </div>
          {props.touched[props.inputName] && props.errors[props.inputName] && (
            <div className="error-message">{props.errors[props.inputName]}</div>
          )}
          {isTouched && errorMessage && <div className="error-message">{errorMessage}</div>}
          {props.errorMessage && (
            <div className="error-message">{props.errorMessage}</div>
          )}
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

const mapStateToProps = (state) => ({
  windowSize: state.window.windowSize,
});

const mapDispatchToProps = (dispatch) => ({});

SelectInput.defaultProps = {
  inputPlaceholder: '',
  placeHolder: true,
  placeHolderValue: '',
  touched: {},
  errors: {},
  errorMessage: '',
  trailingInput: '',
  disable: false,
  required: false,
  zenMode: false,
  display: false,
};

SelectInput.propTypes = {
  windowSize: PropTypes.objectOf(Object).isRequired,
  // title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string,
  placeHolder: PropTypes.bool,
  placeHolderValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  inputValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(Object),
    PropTypes.oneOf([null]),
  ]),
  options: PropTypes.arrayOf(Object).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  touchedName: PropTypes.string,
  errors: PropTypes.objectOf(Object),
  errorsName: PropTypes.string,
  errorMessage: PropTypes.string,
  trailingInput: PropTypes.node,
  disable: PropTypes.bool,
  required: PropTypes.bool,
  zenMode: PropTypes.bool,
  display: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectInput);
