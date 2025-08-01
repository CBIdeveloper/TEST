import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';

import './BoxSelector.scss';

class BoxSelector extends React.PureComponent {
  displayOptions = () => {
    const { props } = this;
    return props.options.map((item) => this.displayItem({ item }));
  };

  displayItem = ({ item }) => (
    <ButtonDiv
      key={item.value}
      className={`selector-item ${this.selectedClassname(item.value)}`}
      onClick={() => this.handleOnClick(item.value)}
    >
      {item.text}
    </ButtonDiv>
  );

  handleOnClick = (value) => {
    const { props } = this;
    props.setFieldValue(props.inputName, value);
  };

  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  selectedClassname = (value) => {
    const { props } = this;
    return props.inputValue === value ? 'selected' : '';
  };

  zenModeClassname = () => {
    const { props } = this;
    return props.zenMode ? 'zen' : '';
  };

  render() {
    const { props } = this;

    return (
      <div className={`box-selector ${this.zenModeClassname()}`}>
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div>
        <div className="box-selector-container">{this.displayOptions()}</div>
        {props.touched[props.inputName] && props.errors[props.inputName] && (
          <div className="error-message">{props.errors[props.inputName]}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

BoxSelector.defaultProps = {
  touched: {},
  errors: {},
  errorMessage: '',
  required: false,
  zenMode: false,
};

BoxSelector.propTypes = {
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(Object),
    PropTypes.oneOf([null]),
  ]).isRequired,
  options: PropTypes.arrayOf(Object).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  zenMode: PropTypes.bool,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BoxSelector),
);
