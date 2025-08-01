import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import AccessControlListItem from '../../../../../components/SystemManagement/AccessControl/AccessControlListItem/AccessControlListItem';
import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';

import AccessControlConfig from '../../../../config/accessControl/accessControlConfig';
import ApiService from '../../../../api/ApiService';

import '../AccessModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { formInitialValue: null };
  }

  componentDidMount() {
    this.initState();
  }

  setFormInitialValue = (formInitialValue) => {
    this.setState({ formInitialValue });
  };

  initState = () => {
    const { props } = this;
    ApiService.roleMain.readRoleMainById(props.roleId).then((response) => {
      this.setFormInitialValue(response);
    });
  };

  diplayAccessControl = ({ values }) =>
    AccessControlConfig.map((item) => (
      <AccessControlListItem
        configItem={item}
        values={values}
        setFieldValue={() => {}}
        display
      />
    ));

  render() {
    const { props, state } = this;

    if (state.formInitialValue === null) return '';

    return (
      <div className="access-modal">
        <SectionTitle title={props.language.accessModal.title} />
        <div className="access-control-table">
          {this.diplayAccessControl({ values: state.formInitialValue })}
        </div>
        <div className="action-button-container">
          <ButtonDiv className="close-button" onClick={props.onClose}>
            {props.language.accessModal.close}
          </ButtonDiv>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ModalContent.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  onClose: PropTypes.func.isRequired,
  roleId: PropTypes.number.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalContent),
);
