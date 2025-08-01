import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import Table from '../../../../../lib/components/Table/Table';

import AcceptInformationRetrievalTable from '../../../../tables/retrievalService/AcceptInformationRetrievalTable/AcceptInformationRetrievalTable';
import InformationRetrievalService from '../../../../api/instances/InformationRetrieval/service';
import ModalHelper from '../../../../helper/ModalHelper';

import '../AcceptInformationRetrievalModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { tableData: [] };
    this.table = new AcceptInformationRetrievalTable(this.setTableData);
  }

  componentDidMount() {
    InformationRetrievalService.getNonAcceptedInformationRetrievalInfo().then(
      (response) => {
        this.setTableData(response.nonAcceptedDataList);
      },
    );
  }

  setTableData = (tableData) => {
    this.setState({ tableData });
  };

  handleAcceptOnClicked = () => {
    const { props } = this;
    InformationRetrievalService.acceptNonAcceptedInformationRetrievalInfo(
      props.tableSelect.selectList,
    ).then((response) => {
      ModalHelper.openMessageModalByStatus({
        response,
        callback: () => {
          props.onClose();
        },
      });
    });
  };

  render() {
    const { props, state } = this;

    return (
      <div className="accept-information-retrieval-modal">
        <SectionTitle
          title={props.language.acceptInformationRetrievalModal.title}
        />
        <Table data={state.tableData} columns={this.table.getTableHeader()} />
        <div className="action-button-container">
          <ButtonDiv
            className="accept-button"
            onClick={this.handleAcceptOnClicked}
            disabled={props.tableSelect.selectList.length === 0}
          >
            {props.language.acceptInformationRetrievalModal.accept}
          </ButtonDiv>
          <ButtonDiv className="close-button" onClick={props.onClose}>
            {props.language.acceptInformationRetrievalModal.close}
          </ButtonDiv>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tableSelect: state.table.tableSelect,
});

const mapDispatchToProps = (dispatch) => ({});

ModalContent.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  tableSelect: PropTypes.objectOf(Object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalContent),
);
