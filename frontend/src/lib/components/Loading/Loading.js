import React from 'react';
import { connect } from 'react-redux';

import './Loading.scss';

class Loading extends React.PureComponent {
  render() {
    return (
      <div className="loading">
        <div className="icon" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

Loading.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
