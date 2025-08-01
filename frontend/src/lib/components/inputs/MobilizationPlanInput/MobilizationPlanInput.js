import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import SelectInput from '../SelectInput/SelectInput';

import './MobilizationPlanInput.scss';

class MobilizationPlanInput extends React.PureComponent {
  requiredClassname = () => {
    const { props } = this;
    return props.required ? 'required' : '';
  };

  render() {
    const { props } = this;

    return (
      <div className="mobilization-plan-input">
        <div className={`input-title ${this.requiredClassname()}`}>
          {props.title}
        </div>
        <div className="input-container">
          <div className="plan-input-container">
            <div className="plan-container">
              <SelectInput
                zenMode
                title=""
                inputName={props.planInputName}
                inputPlaceholder={props.planInputPlaceholder}
                inputValue={props.planInputValue}
                setFieldValue={(field, value) => {
                  props.planOnChanged({
                    value,
                    field,
                    setFieldValue: props.setFieldValue,
                    index: props.index,
                  });
                }}
                options={props.planOptions}
                touched={props.touched}
                errors={props.errors}
                display={props.display}
              />
            </div>
            {props.hideClassification ? (
              ''
            ) : (
              <div className="classification-container">
                <SelectInput
                  zenMode
                  title=""
                  inputName={props.classificationInputName}
                  inputPlaceholder={props.classificationInputPlaceholder}
                  inputValue={props.classificationInputValue}
                  setFieldValue={(field, value) => {
                    props.classificationOnChanged({
                      value,
                      field,
                      setFieldValue: props.setFieldValue,
                      index: props.index,
                    });
                  }}
                  options={props.classificationOptions}
                  touched={props.touched}
                  errors={props.errors}
                  display={props.display}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

MobilizationPlanInput.defaultProps = {
  planInputPlaceholder: '',
  classificationInputPlaceholder: '',
  touched: '',
  errors: '',
  errorMessage: '',
  required: false,
  display: false,
  index: 0,
};

MobilizationPlanInput.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,

  planInputName: PropTypes.string.isRequired,
  planInputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  planInputPlaceholder: PropTypes.string,
  planOptions: PropTypes.arrayOf(Object).isRequired,
  planOnChanged: PropTypes.func.isRequired,
  name:PropTypes.bool,
  classificationInputName: PropTypes.string.isRequired,
  classificationInputValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  classificationInputPlaceholder: PropTypes.string,
  classificationOptions: PropTypes.arrayOf(Object).isRequired,
  classificationOnChanged: PropTypes.func.isRequired,

  hideClassification: PropTypes.bool.isRequired,

  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(Object),
  errors: PropTypes.objectOf(Object),
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  display: PropTypes.bool,
  index: PropTypes.number,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MobilizationPlanInput),
);
