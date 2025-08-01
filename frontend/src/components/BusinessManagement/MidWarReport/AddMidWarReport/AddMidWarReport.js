import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddBusinessManagement from '../../AddBusinessManagement';

class AddMidWarReport extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="add-mid-war-report">
        <AddBusinessManagement
          title={props.language.businessManagement.subMenus.addMidWarReport}
          typeId={11}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddMidWarReport.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMidWarReport);
