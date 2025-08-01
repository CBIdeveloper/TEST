import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditBusinessManagement from '../../EditBusinessManagement';

class EditMidWarReport extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="edit-mid-war-report">
        <EditBusinessManagement
          title={props.language.businessManagement.subMenus.editMidWarReport}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

EditMidWarReport.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMidWarReport);
