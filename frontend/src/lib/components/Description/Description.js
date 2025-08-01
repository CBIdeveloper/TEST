import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Description.scss';

class Description extends React.PureComponent {
  displayContent = () => {
    const { props } = this;
    if (
      props.content === null ||
      props.content === undefined ||
      props.content === ''
    ) {
      return (
        <div className="content no-data">
          {props.language.description.noData}
        </div>
      );
    }
    return (
      <div className="content">
        <div>{props.content}</div>
        <div className="sub-content">{props.subContent}</div>
      </div>
    );
  };

  render() {
    const { props } = this;

    return (
      <div className="description">
        <div className="title">{props.title}</div>
        {this.displayContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

Description.defaultProps = {
  content: '',
  subContent: '',
};

Description.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default connect(mapStateToProps, mapDispatchToProps)(Description);
