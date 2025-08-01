import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ContactDetailItem.scss';

class ContactDetailItem extends React.PureComponent {
  render() {
    const { props } = this;
    // console.log(props)
    return (
      <div className={`contact-detail-item ${props.color}`}>
        {props.icon && (
          <img src={props.icon} className="contact-detail-icon" alt="icon" />
        )}
        <div className="horizontal-line" />
        <div className="contact-info-container">
          <div className="info-container">
            <div className="info-title">業務計畫別</div>
            <div className="info-divider" />
            <div className="info-content">{props.content.mobilizationPlanText}</div>
          </div>
          <div className="info-container">
            <div className="info-title">
              {props.language.contactDetailItem.workPlace}
            </div>
            <div className="info-divider" />
            <div className="info-content">{props.content.workPlace}</div>
          </div>
          <div className="info-container">
            <div className="info-title">
              {props.language.contactDetailItem.name}
            </div>
            <div className="info-divider" />
            <div className="info-content">{props.content.name}</div>
          </div>
          <div className="info-container">
            <div className="info-title">
              {props.language.contactDetailItem.jobPosition}
            </div>
            <div className="info-divider" />
            <div className="info-content">{props.content.jobPosition}</div>
          </div>
          <div className="info-container">
            <div className="info-title">
              {props.language.contactDetailItem.fullTelephone}
            </div>
            <div className="info-divider" />
            <div className="info-content">{props.content.fullTelephone}</div>
          </div>
          <div className="info-container">
            <div className="info-title">
              {props.language.contactDetailItem.email}
            </div>
            <div className="info-divider" />
            <div className="info-content">{props.content.email}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

ContactDetailItem.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  content: PropTypes.objectOf(Object).isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailItem);
