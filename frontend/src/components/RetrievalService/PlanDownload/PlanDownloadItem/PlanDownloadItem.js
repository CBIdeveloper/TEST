import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';

import './PlanDownloadItem.scss';

class PlanDownloadItem extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="plan-download-item">
        <div className={`top-strip ${props.color}`} />
        <div className={`content-container`}>
          <img src={props.image} className="plan-image" alt="plan" />
          <div className="plan-title">{props.title}</div>
          <div className="plan-description">{props.description}</div>
        </div>
        <ButtonDiv className="download-button" onClick={props.onClickFunction}>
          {props.language.planDownloadItem.download}
        </ButtonDiv>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

PlanDownloadItem.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClickFunction: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanDownloadItem);
