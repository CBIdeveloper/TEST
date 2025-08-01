import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonDiv from '../../../../../lib/components/ButtonDiv/ButtonDiv';
import SectionTitle from '../../../../../lib/components/SectionTitle/SectionTitle';
import Table from '../../../../../lib/components/Table/Table';

import '../TableSubModal.scss';

class ModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { tableData: [] };
    this.table = new props.TableClass(this.setTableData);
    this.table.typeId = props.typeId;
  }

  componentDidMount() {
    this.table.fetchTableData();
  }

  setTableData = (tableData) => {
    const data = tableData.map((item, index) => ({
      ...item,
      index: index + this.table.currentSkip() + 1,
    }));
    this.setState({ tableData: data });
  };

  render() {
    const { props, state } = this;

    return (
      <div className="table-modal">
        <SectionTitle title={props.title} />
        <Table data={state.tableData} columns={this.table.getTableHeader()} />
        <div className="action-button-container">
          <ButtonDiv className="close-button" onClick={props.onClose}>
            {props.language.tableModal.close}
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
  title: PropTypes.string.isRequired,
  TableClass: PropTypes.func.isRequired,
  typeId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
