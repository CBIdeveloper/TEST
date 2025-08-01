import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import Table from '../../../../../lib/components/Table/Table';

import ApprovalTable from '../../../../tables/dataSearch/ApprovalTable/ApprovalTable';
import ApiService from '../../../../api/ApiService';

import '../BatchApprovalModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { tableData: [] };
    this.table = new ApprovalTable();
  }

  componentDidMount() {
    // TODO: load table data...
  }

  setTableData = (tableData) => {
    this.setState({ tableData });
  };

  handleApproveOnClicked = () => {};

  render() {
    const { props, state } = this;

    return (
      <div className="batch-approval-modal">
        <SectionTitle title={props.language.batchApprovalModal.title} />
        <Table data={state.tableData} columns={this.table.getTableHeader()} />
        <div className="action-button-container">
          <ButtonDiv className="close-button" onClick={props.onClose}>
            {props.language.batchApprovalModal.close}
          </ButtonDiv>
          <ButtonDiv className="approve-button" onClick={this.handleApproveOnClicked}>
            {props.language.batchApprovalModal.approve}
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
  id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
