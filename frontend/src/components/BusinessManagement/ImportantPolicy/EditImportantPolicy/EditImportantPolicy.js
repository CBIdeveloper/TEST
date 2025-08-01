import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditBusinessManagement from '../../EditBusinessManagement';

class EditImportantPolicy extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="edit-important-policy">
        <EditBusinessManagement
          title={props.language.businessManagement.subMenus.editImportantPolicy}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

EditImportantPolicy.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditImportantPolicy);
