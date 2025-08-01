import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../lib/components/ButtonDiv/ButtonDiv';

import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import { createQuery } from '../../../../utils/parsers/queryParser';

import './ContactItem.scss';
import UrlParser from '../../../../utils/parsers/urlParser';

class ContactItem extends React.PureComponent {
  displayLogo = () => {
    const { props } = this;
    return props.logo === '' ? (
      <div className="unit-logo" />
    ) : (
      <img src={props.logo} className="unit-logo" alt="logo" />
    );
  };

  handleOnClicked = () => {
    const { props } = this;
    const query = createQuery({
      [QueryType.TAB]: props.id,
    });
    props.history.push({
      pathname: UrlParser([
        props.location.pathname,
        Path.contactInformationDetailPath,
      ]),
      search: query,
    });
  };

  render() {
    const { props } = this;

    return (
      <div className={`contact-item ${props.colorName}`}>
        <div className="horizontal-line" />
        <div className="contact-content">
          <div className="logo-section">
            {this.displayLogo()}
            <div className="unit-name">{props.unitName}</div>
            <div className="plan-name">{props.language.contactItem.plan}</div>
          </div>
          <div className="icon-section">
            <div className="short-name">{props.shortName}</div>
            <img
              className="contact-icon"
              src={props.contactIcon}
              alt="contact"
            />
          </div>
        </div>
        <ButtonDiv className="contact-button" onClick={this.handleOnClicked}>
          {props.language.contactItem.contact}
        </ButtonDiv>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

ContactItem.defaultProps = {
  logo: '',
};

ContactItem.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  id: PropTypes.number.isRequired,
  logo: PropTypes.string,
  unitName: PropTypes.string.isRequired,
  shortName: PropTypes.string.isRequired,
  contactIcon: PropTypes.string.isRequired,
  colorName: PropTypes.string.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactItem),
);
