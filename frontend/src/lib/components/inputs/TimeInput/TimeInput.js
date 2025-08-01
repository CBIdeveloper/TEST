import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import './TimeInput.scss';

class TimeInput extends React.PureComponent {
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
      <div className="time-input">
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
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={props.timeIntervals}
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            timeCaption="Select time"
          />
        </div>
        {props.touched[props.inputName] && props.errors[props.inputName] && (
          <div className="error-message">{props.errors[props.inputName]}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

TimeInput.defaultProps = {
  inputPlaceholder: '',
  inputValue: '',
  touched: {},
  errors: {},
  required: false,
};

TimeInput.defaultProps = {
  timeIntervals: 1,
};

TimeInput.propTypes = {
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string,
  inputValue: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number,
    PropTypes.objectOf(Object),
  ]),
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  required: PropTypes.bool,
  timeIntervals: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeInput);
