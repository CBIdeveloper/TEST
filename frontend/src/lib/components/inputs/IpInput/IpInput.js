import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import TextInput from '../TextInput/TextInput';

import FormikHelper from '../../../../utils/helper/FormikHelper';

import './IpInput.scss';

class IpInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { first: '', second: '', third: '', fourth: '' };
    this.firstRef = React.createRef();
    this.secondRef = React.createRef();
    this.thirdRef = React.createRef();
    this.fourthRef = React.createRef();
  }

  componentDidMount() {
    this.initState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { props, state } = this;
    if (
      state.first !== prevState.first ||
      state.second !== prevState.second ||
      state.third !== prevState.third ||
      state.fourth !== prevState.fourth
    ) {
      this.handleValueOnChange();
    }
    if (props.inputValue !== prevProps.inputValue) {
      this.initState();
    }
  }

  setFirst = (first) => {
    const { state } = this;
    if (state.first !== first && first.length === 3) {
      this.secondRef.current.focus();
    }
    this.setState({ first });
  };

  setSecond = (second) => {
    const { state } = this;
    if (state.second !== second && second.length === 3) {
      this.thirdRef.current.focus();
    }
    this.setState({ second });
  };

  setThird = (third) => {
    const { state } = this;
    if (state.third !== third && third.length === 3) {
      this.fourthRef.current.focus();
    }
    this.setState({ third });
  };

  setFourth = (fourth) => {
    this.setState({ fourth });
  };

  initState = () => {
    const { props } = this;
    if (props.inputValue !== null) {
      const splitList = props.inputValue.split('.');
      if (splitList[0] !== undefined) {
        this.setFirst(splitList[0]);
      }
      if (splitList[1] !== undefined) {
        this.setSecond(splitList[1]);
      }
      if (splitList[2] !== undefined) {
        this.setThird(splitList[2]);
      }
      if (splitList[3] !== undefined) {
        this.setFourth(splitList[3]);
      }
    }
  };

  handleValueOnChange = () => {
    const { props, state } = this;
    const value = `${state.first}.${state.second}.${state.third}.${state.fourth}`;
    props.setFieldValue(props.inputName, value);
  };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  displayInput = () => {
    const { props, state } = this;
    return (
      <div className="ip-container">
        <TextInput
          zenMode
          title=""
          inputType="number"
          inputName="first"
          inputValue={state.first}
          inputOnChange={(event) => this.setFirst(event.target.value)}
          inputPlaceholder={props.inputPlaceholder}
          touched={props.touched}
          errors={props.errors}
          onKeyUp={props.onKeyUp}
          disable={props.disable}
          inputRef={this.firstRef}
        />
        <div className="dot">.</div>
        <TextInput
          zenMode
          title=""
          inputType="number"
          inputName="second"
          inputValue={state.second}
          inputOnChange={(event) => this.setSecond(event.target.value)}
          inputPlaceholder={props.inputPlaceholder}
          touched={props.touched}
          errors={props.errors}
          onKeyUp={props.onKeyUp}
          disable={props.disable}
          inputRef={this.secondRef}
        />
        <div className="dot">.</div>
        <TextInput
          zenMode
          title=""
          inputType="number"
          inputName="third"
          inputValue={state.third}
          inputOnChange={(event) => this.setThird(event.target.value)}
          inputPlaceholder={props.inputPlaceholder}
          touched={props.touched}
          errors={props.errors}
          onKeyUp={props.onKeyUp}
          disable={props.disable}
          inputRef={this.thirdRef}
        />
        <div className="dot">.</div>
        <TextInput
          zenMode
          title=""
          inputType="number"
          inputName="fourth"
          inputValue={state.fourth}
          inputOnChange={(event) => this.setFourth(event.target.value)}
          inputPlaceholder={props.inputPlaceholder}
          touched={props.touched}
          errors={props.errors}
          onKeyUp={props.onKeyUp}
          disable={props.disable}
          inputRef={this.fourthRef}
        />
      </div>
    );
  };

  render() {
    const { props } = this;

    return (
      <div className="ip-input">
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

IpInput.defaultProps = {
  inputPlaceholder: '',
  touched: {},
  errors: {},
  errorMessage: '',
  description: '',
  onKeyUp: FormikHelper.handleEnterKeyUp,
  disable: false,
  required: false,
};

IpInput.propTypes = {
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  inputPlaceholder: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  errorMessage: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onKeyUp: PropTypes.func,
  disable: PropTypes.bool,
  required: PropTypes.bool,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IpInput),
);
