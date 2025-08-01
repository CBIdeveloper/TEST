import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './FormSectionTitle2.scss';
import ButtonDiv from '../ButtonDiv/ButtonDiv';

class FormSectionTitle extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="form-section-title">
        {props.title}
        <ButtonDiv
          className="trailing-icon-three"
          onClick={props.iconOnClick}
        >
          {props.trailingIcon}
        </ButtonDiv>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

FormSectionTitle.defaultProps = {
  trailingIcon: '',
  iconOnClick: () => {},
};
FormSectionTitle.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  trailingIcon: PropTypes.node,
  iconOnClick: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormSectionTitle);
