import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import './YearInput.scss';

class YearInput extends React.PureComponent {
  handleInlineDateChange = (event) => {
    const { props } = this;
    props.setFieldValue(props.inputName, event);
  };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  render() {
    const { props } = this;

    return (
      <div className="year-input">
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div>
        <div className="input-container">
          <DatePicker
            className="form-input"
            name={props.inputName}
            placeholderText={props.inputPlaceholder}
            selected={props.inputValue}
            onChange={this.handleInlineDateChange}
            showYearPicker
            dateFormat="yyyy"
          />
        </div>
        {props.touched[props.inputName] && props.errors[props.inputName] && (
          <div className="error-message">{props.errors[props.inputName]}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

YearInput.defaultProps = {
  inputPlaceholder: '',
  inputValue: '',
  touched: {},
  errors: {},
  required: false,
};

YearInput.propTypes = {
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string,
  inputValue: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.objectOf(Object),
  ]),
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  required: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(YearInput);
