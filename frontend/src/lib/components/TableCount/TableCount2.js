import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import XLSX from 'xlsx';
import './TableCount2.scss';

class TableCount2 extends React.PureComponent {
  render() {
    const { props } = this;
    // const exportToExcel = () => {
    //   console.log(props.filteredTableData);
    //   const excelData = props.filteredTableData.map((item) => ({
    //     '人/物力': item.type,
    //     編館類別: item.name2,
    //     動員方案: item.mobilizationPlan,
    //     動員分類: item.mobilizationClassification,
    //     更新週期: item.updateCycle,
    //     計畫編管數: item.braidingNum,
    //     系統數據: Number(item.systemNum),
    //     確認狀態: item.approvalStatus,
    //     資料異動日期: item.updatedAtString,
    //   }));
    //   console.log(excelData);
    //   const ws = XLSX.utils.json_to_sheet(excelData);
    //   const wb = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, 'dataSearch');
    //   XLSX.writeFile(wb, 'dataSearch.xlsx');
    // };

    return (
      <div className="table-count">
        <span>{`${props.language.total}${props.count}${props.language.unit}`}</span>
        {/* <button className="table-count-button" onClick={exportToExcel}>
          EXCEL匯出
        </button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject.tableCount,
});

const mapDispatchToProps = (dispatch) => ({});

TableCount2.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  count: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCount2);
