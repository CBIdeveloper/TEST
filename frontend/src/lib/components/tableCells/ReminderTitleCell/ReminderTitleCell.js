import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import LinkCell from '../LinkCell/LinkCell';

import { closeDialogModal } from '../../../../store/modal/slice';

import ModalHelper from '../../../../utils/helper/ModalHelper';
import Path from '../../../../utils/path/path';
import QueryType from '../../../../utils/types/QueryType';
import { createQuery } from '../../../../utils/parsers/queryParser';
import MobilizationProgramTable from '../../../../utils/tables/retrievalService/PlanDownload/MobilizationProgramTable';
import MobilizationPlanTable from '../../../../utils/tables/retrievalService/PlanDownload/MobilizationPlanTable';
import MobilizationClassificationTable from '../../../../utils/tables/retrievalService/PlanDownload/MobilizationClassificationTable';
import MobilizationExecutionTable from '../../../../utils/tables/retrievalService/PlanDownload/MobilizationExecutionTable';

import './ReminderTitleCell.scss';

class ReminderTitleCell extends React.PureComponent {
  handleOnClick = () => {
    const { props } = this;
    const { type, referencingId } = props.cell.row.original;
    if (type === 'announcement') {
      ModalHelper.openAnnouncementModal({ id: referencingId });
    }
    if (type === 'business') {
      const { businessManagementTypeString } = props.cell.row.original;
      ModalHelper.openBusinessManagementModal({
        id: referencingId,
        title: businessManagementTypeString,
      });
    }
    if (type === 'regulation') {
      const query = createQuery({
        [QueryType.ID]: referencingId,
      });
      props.history.push({
        pathname: `/${Path.retrievalServicePath}/${Path.regulationManagementPath}/${Path.editRegulationPath}`,
        search: query,
      });
      props.closeDialogModal();
    }
    if (type === 'platformuploadrecord') {
      props.history.push({
        pathname: `/${Path.dataSearchPath}/${Path.cloudDataPath}`,
      });
      props.closeDialogModal();
    }
    if (type === 'plan_mobilization_program') {
      ModalHelper.openTableSubModal({
        modalTitle: '動員綱領',
        sectionTitle: '動員綱領',
        typeId: 0,
        TableClass: MobilizationProgramTable,
      });
    }
    if (type === 'plan_mobilization_plan') {
      const { plan_name } = props.cell.row.original;
      ModalHelper.openTableSubModal({
        modalTitle: '動員方案',
        sectionTitle: `方案別：${plan_name}`,
        typeId: referencingId,
        TableClass: MobilizationPlanTable,
      });
    }
    if (type === 'plan_mobilization_classification') {
      const { classification_name } = props.cell.row.original;
      ModalHelper.openTableSubModal({
        modalTitle: '動員分類',
        sectionTitle: `動員分類：${classification_name}`,
        typeId: referencingId,
        TableClass: MobilizationClassificationTable,
      });
    }
    if (type === 'plan_mobilization_execution') {
      const { city_name } = props.cell.row.original;
      ModalHelper.openTableSubModal({
        modalTitle: '動員執行',
        sectionTitle: `動員執行：${city_name}`,
        typeId: referencingId,
        TableClass: MobilizationExecutionTable,
      });
    }
    if (type === 'braiding_category') {
      const { fullName, systemNum, transmissionDate } = props.cell.row.original;
      ModalHelper.openBraidingCategoryReminderModal({
        id: referencingId,
        fullName: fullName,
        systemNum: systemNum,
        transmissionDate: transmissionDate
      });
    }
  };

  render() {
    const { props } = this;
    const { type } = props.cell.row.original;

    switch (type) {
      case 'platformuploadrecordlog':
        return <ButtonDiv className="reminder-title-cell-nolink">{props.cell.value}</ButtonDiv>;
      case 'regulation':
        const { url } = props.cell.row.original;
        return <LinkCell title={props.cell.value} link={url} />;
      default:
        return (
          <ButtonDiv className="reminder-title-cell" onClick={this.handleOnClick}>
            {props.cell.value}
          </ButtonDiv>);
    }
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  closeDialogModal: (payload) => dispatch(closeDialogModal(payload)),
});

ReminderTitleCell.propTypes = {
  cell: PropTypes.objectOf(Object).isRequired,
  closeDialogModal: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReminderTitleCell),
);
