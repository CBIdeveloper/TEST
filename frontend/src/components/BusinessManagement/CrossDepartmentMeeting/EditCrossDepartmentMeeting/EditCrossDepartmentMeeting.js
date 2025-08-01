import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditBusinessManagement from '../../EditBusinessManagement';

class EditCrossDepartmentMeeting extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="edit-cross-department-meeting">
        <EditBusinessManagement
          title={
            props.language.businessManagement.subMenus
              .editCrossDepartmentMeeting
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

EditCrossDepartmentMeeting.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditCrossDepartmentMeeting);
