import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';

import ModalHelper from '../../../../helper/ModalHelper';

import '../MemoModal.scss';
import Container from '../../../../../lib/components/Container/Container';
import PageTitle from '../../../../../lib/components/PageTitle/PageTitle';

class ModalContent extends React.PureComponent {
  render() {
    const { props, state } = this;

    return (
      <div className="memo-modal">
        {/* <Container breadcrumb={false}> */}
          {/* <PageTitle title="AAA" /> */}
          <ButtonDiv
            className="modal-button"
            onClick={ModalHelper.openBraidingCategoryMemoModal}
          >
            {props.language.memoModal.braidingCategory}
          </ButtonDiv>
          <ButtonDiv
            className="modal-button"
            onClick={ModalHelper.openBusinessManagementMemoModal}
          >
            {props.language.memoModal.businessManagement}
          </ButtonDiv>
          <ButtonDiv
            className="modal-button"
            onClick={ModalHelper.openPlanUpdateMemoModal}
          >
            {props.language.memoModal.planUpdate}
          </ButtonDiv>
        {/* </Container> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

ModalContent.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalContent),
);
