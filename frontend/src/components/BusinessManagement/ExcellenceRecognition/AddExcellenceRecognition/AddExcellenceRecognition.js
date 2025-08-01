import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddBusinessManagement from '../../AddBusinessManagement';

class AddExcellenceRecognition extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <AddBusinessManagement
        title={
          props.language.businessManagement.subMenus.addExcellenceRecognition
        }
        typeId={9}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddExcellenceRecognition.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddExcellenceRecognition);
