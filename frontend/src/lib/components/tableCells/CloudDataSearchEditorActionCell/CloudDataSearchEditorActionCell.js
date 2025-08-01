import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import ApiService from '../../../../utils/api/ApiService';

class CloudDataTransDataActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {};
  }

  componentDidMount() {}

  openModal = () => {
    const { props } = this;
    console.log(props.cell.row);
    const id = props.cell.row.original.checkUserAccountId;
    ApiService.fileUpload.getUserData(id).then((res) => {
      const data = res.UserDataList[0];
      data.fullTelephone = data.businessPhone;
      delete data.businessPhone;
      data.workPlace = props.cell.row.cells[3].value;
      delete data.maintainManufacturer;
      data.name = props.cell.row.original.editor;
      data.mobilizationPlanText = data.mobilizationPlanText;
      console.log(data);
      ModalHelper.openEditorModal({ data });
    });
  };

  render() {
    const { props, state } = this;
    return (
      <div className="cloud-data-search-editor-action-cell">
        <div className="cloud-data-search-editor-action-cell">
          <ButtonDiv className="text" onClick={this.openModal}>
            {props.cell.row.original.editor}
          </ButtonDiv>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({});

CloudDataTransDataActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CloudDataTransDataActionCell),
);
