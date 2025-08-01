import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IoArrowDownCircleOutline } from 'react-icons/io5';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';

import './PlanItem.scss';

class PlanItem extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <ButtonDiv
        className={`plan-item ${props.color}`}
        onClick={props.onClickFunction}
      >
        <div className="vertical-line" />
        <div className="plain-item-content">
          <IoArrowDownCircleOutline className="download-icon" />
          <div className="plan-container">
            <div className="plan-title">{props.title}</div>
            <div className="plan-unit">{props.unit}</div>
          </div>
        </div>
      </ButtonDiv>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

PlanItem.defaultProps = {
  unit: '',
};

PlanItem.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  unit: PropTypes.string,
  onClickFunction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanItem);
