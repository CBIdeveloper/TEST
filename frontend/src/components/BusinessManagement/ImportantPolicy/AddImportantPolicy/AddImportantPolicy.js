import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddBusinessManagement from '../../AddBusinessManagement';

class AddImportantPolicy extends React.PureComponent {
  render() {
    const { props } = this;

    return (
      <div className="add-important-policy">
        <AddBusinessManagement
          title={props.language.businessManagement.subMenus.addImportantPolicy}
          typeId={1}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

AddImportantPolicy.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddImportantPolicy);
