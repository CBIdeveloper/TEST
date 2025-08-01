import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddBusinessManagement from '../../AddBusinessManagement';

class AddCrossDepartmentMeeting extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <AddBusinessManagement
        title={
          props.language.businessManagement.subMenus.addCrossDepartmentMeeting
        }
        typeId={2}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddCrossDepartmentMeeting.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCrossDepartmentMeeting);
