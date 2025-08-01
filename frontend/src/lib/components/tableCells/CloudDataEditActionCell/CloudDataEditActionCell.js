import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import ButtonDiv from '../../ButtonDiv/ButtonDiv';
import ModalHelper from '../../../../utils/helper/ModalHelper';
import CloudDataEdit from '../../../../components/DataSearch/CloudDataEdit';
import { createQuery } from '../../../../utils/parsers/queryParser';
import Path from '../../../../utils/path/path';
import './CloudDataEditActionCell.scss';
import QueryType from '../../../../utils/types/QueryType';
import ApiService from '../../../../utils/api/ApiService';
import { getUserId, getFirstlevelUnitId } from '../../../../utils/auth/auth';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { setLoading } from '../../../../../src/store/loading/slice';

class CloudDataEditActionCell extends React.PureComponent {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      id: null,
      complianceQuantity: null,
      nonComplianceQuantity: null,
      isDataFetched: false,
    };
  }
  setId = (id) => {
    this.setState({ id });
  };
  setCQ = (complianceQuantity) => {
    this.setState({ complianceQuantity });
  };
  setNCQ = (nonComplianceQuantity) => {
    this.setState({ nonComplianceQuantity });
  };
  openModal = () => {
    const { props } = this;
    const code = props.cell.row.original.code;
    ModalHelper.openImportModal({
      code,
    });
  };

  openEdit = () => {
    const { props, state } = this;
    const { name2, code } = props.cell.row.original;
    if (!state.isDataFetched) {
      if (getFirstlevelUnitId() != '') {
        ApiService.fileUpload.getDataByCode(code).then((res) => {
          if (res != '無一級機關') {
            if (res.fileUploadList[0] != undefined) {
              this.setCQ(res.fileUploadList[0].complianceQuantity);
              this.setNCQ(res.fileUploadList[0].nonComplianceQuantity);
            }
          }
        });
        this.setState({ isDataFetched: true });
      }
    }
    if (state.complianceQuantity == null) {
      state.complianceQuantity = 0;
    }
    if (state.nonComplianceQuantity == null) {
      state.nonComplianceQuantity = 0;
    }
    const query = createQuery({
      [QueryType.NAME]: name2,
      [QueryType.CODE]: code,
      [QueryType.ID]: getUserId(),
      [QueryType.CQ]: state.complianceQuantity,
      [QueryType.NCQ]: state.nonComplianceQuantity,
    });
    return `${props.location.pathname}/${Path.cloudDataEditPath}${query}`;
  };

  download = async () => {
    const { props, state } = this;
    const { name2, code } = props.cell.row.original;
    props.setLoading(true);
    /**本機 */
    // const templatePath = `../../documents/exportTemplate/${name2}.xlsx`;
    /**發佈 */
    const templatePath = `../documents/exportTemplate/${name2}.xlsx`;
    const templateResponse = await fetch(templatePath);
    const templateArrayBuffer = await templateResponse.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(templateArrayBuffer);
    const worksheet = workbook.worksheets[0];
    let templateData = [];
    worksheet.eachRow((row) => {
      templateData.push(row.values.slice(1));
    });
    const response = await ApiService.cloudDataEditService.cloudDataEditData(
      code,
    );
    let cloudData = [];
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].FirstlevelUnitId == getFirstlevelUnitId()) {
        cloudData.push(response.data[i]);
      }
    }
    // if (props.limitSize && cloudData.size < props.sizeLimitInMb * 1048576) {
    cloudData = cloudData.map((obj) => {
      let newObj = { NonComplianceReason: obj.NonComplianceReason };
      for (let key in obj) {
        if (key !== 'NonComplianceReason') {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    });
    cloudData.forEach((obj) => {
      delete obj.Id;
      delete obj.Gender;
      delete obj.HabitatY;
      delete obj.HabitatX;
      delete obj.AbodeY;
      delete obj.AbodeX;
      delete obj.ManageY;
      delete obj.ManageX;
      delete obj.StationY;
      delete obj.StationX;
      delete obj.CompanyY;
      delete obj.CompanyX;
      delete obj.SetupY;
      delete obj.SetupX;
      delete obj.HmachineryY;
      delete obj.HmachineryX;
      delete obj.FactoryY;
      delete obj.FactoryX;
      delete obj.PlanY;
      delete obj.PlanX;
      delete obj.OrgY;
      delete obj.OrgX;
      delete obj.StorehouseY;
      delete obj.StorehouseX;
      delete obj.CenterY;
      delete obj.CenterX;
      delete obj.ReligionY;
      delete obj.ReligionX;
      delete obj.SchoolY;
      delete obj.SchoolX;
      delete obj.CityY;
      delete obj.CityX;
      delete obj.RequnitY;
      delete obj.RequnitX;
      if (code == '001') {
        delete obj.AgeDist;
      } else if (code == '008' || code == '009') {
        delete obj.Age;
      } else if (code == '011') {
        delete obj.PlanType;
        delete obj.PlanTime;
        delete obj.PlanPlace;
        delete obj.LevyUnit;
      } else if (code == '018' || code == '020') {
        delete obj.Deputyname;
        delete obj.Deputyid;
        delete obj.LevyType;
        delete obj.LevyUnit;
        delete obj.LevyPlace;
        delete obj.LevyCity;
        delete obj.LevyTown;
        delete obj.LevyVillage;
        delete obj.LevyY;
        delete obj.LevyX;
        delete obj.LevyTime;
        delete obj.LevyModel;
        delete obj.LevyShiptype;
        delete obj.LevyUniteno;
        delete obj.Visaquantity;
      } else if (code == '019') {
        delete obj.PlanType;
        delete obj.PlanTime;
        delete obj.PlanPlace;
      } else if (code == '029') {
        delete obj.MilitaryType;
        delete obj.MilitaryUnit;
        delete obj.FactoryName;
        delete obj.MilitaryUniteno;
        delete obj.ProduceSystem;
        delete obj.ProduceProject;
        delete obj.MaterialName;
        delete obj.Model;
        delete obj.Unit;
        delete obj.Quantity;
      } else if (code == '030') {
        delete obj.DailyUsage;
        delete obj.SafetyStock;
        delete obj.FacilityY;
        delete obj.FacilityX;
      } else if (code == '036') {
        delete obj.SafetyStock;
        delete obj.SafetyDays;
        delete obj.AvailableDays;
        delete obj.Population;
      } else if (code == '040') {
      } else if (code == '042') {
        delete obj.ManagePlace;
        delete obj.ManageCity;
        delete obj.ManageTown;
        delete obj.ManageVillage;
      } else if (code == '046') {
        delete obj.HospitalY;
        delete obj.HospitalX;
        delete obj.InformQuality;
      } else if (code == '908' || code == '914' || code == '917') {
        delete obj.PlanType;
        delete obj.PlanStart;
        delete obj.PlanEnd;
        delete obj.PlanPlace;
        delete obj.LevyType;
      } else if (code == '942') {
        delete obj.PlanType;
        delete obj.PlanStart;
        delete obj.PlanEnd;
        delete obj.PlanPlace;
        delete obj.LevyType;
        delete obj.LevySkill
      }
      delete obj.CreDate;
      delete obj.UpdateDate;
      delete obj.Updatedate;
      delete obj.CreatedUserAccountId;
      delete obj.UpdatedUserAccountId;
      delete obj.UpdateDate1;
      delete obj.UploadedUserAccountId;
      delete obj.UploadDate;
      delete obj.DataStatus;
      delete obj.ApprovalStatus;
      delete obj.ApprovedUserAccountId;
      delete obj.ApprovalDate;
      delete obj.ApprovalUser;
      delete obj.CreUser;
      delete obj.UpdateUser;
      delete obj.UploadUser;
      delete obj.DeletedAt;
      delete obj.CityId;
      delete obj.FirstlevelUnitId;
      delete obj.MarkId;
      if (obj.hasOwnProperty('Birthdate')) {
        if (obj.Birthdate != null) {
          const formattedValue = moment(obj.Birthdate)
            .format('YYYYMMDD')
            .toString()
            .replace(/-/g, '');
          const year = parseInt(formattedValue.substring(0, 4), 10) - 1911;
          const taiwanYear = year.toString().padStart(3, '0');
          taiwanYear + formattedValue.substring(4);
          obj.Birthdate = taiwanYear + formattedValue.substring(4);
        }
      }
      if (obj.hasOwnProperty('Enterdate')) {
        if (obj.Enterdate != null) {
          const formattedValue = moment(obj.Enterdate)
            .format('YYYYMMDD')
            .toString()
            .replace(/-/g, '');
          const year = parseInt(formattedValue.substring(0, 4), 10) - 1911;
          const taiwanYear = year.toString().padStart(3, '0');
          obj.Enterdate = taiwanYear + formattedValue.substring(4);
        }
      }
      if (obj.hasOwnProperty('Retiredate')) {
        if (obj.Retiredate != null) {
          const formattedValue = moment(obj.Retiredate)
            .format('YYYYMMDD')
            .toString()
            .replace(/-/g, '');
          const year = parseInt(formattedValue.substring(0, 4), 10) - 1911;
          const taiwanYear = year.toString().padStart(3, '0');
          taiwanYear + formattedValue.substring(4);
          obj.Retiredate = taiwanYear + formattedValue.substring(4);
        }
      }
      if (obj.hasOwnProperty('PlanStart')) {
        if (obj.PlanStart != null) {
          const formattedValue = moment(obj.PlanStart)
            .format('YYYYMMDD')
            .toString()
            .replace(/-/g, '');
          const year = parseInt(formattedValue.substring(0, 4), 10) - 1911;
          const taiwanYear = year.toString().padStart(3, '0');
          taiwanYear + formattedValue.substring(4);
          obj.PlanStart = taiwanYear + formattedValue.substring(4);
        }
      }
      if (obj.hasOwnProperty('PlanEnd')) {
        if (obj.PlanEnd != null) {
          const formattedValue = moment(obj.PlanEnd)
            .format('YYYYMMDD')
            .toString()
            .replace(/-/g, '');
          const year = parseInt(formattedValue.substring(0, 4), 10) - 1911;
          const taiwanYear = year.toString().padStart(3, '0');
          taiwanYear + formattedValue.substring(4);
          obj.PlanEnd = taiwanYear + formattedValue.substring(4);
        }
      }
      if (obj.hasOwnProperty('PlanTime')) {
        if (obj.PlanTime != null) {
          const formattedValue = moment(obj.PlanTime)
            .format('YYYYMMDD')
            .toString()
            .replace(/-/g, '');
          const year = parseInt(formattedValue.substring(0, 4), 10) - 1911;
          const taiwanYear = year.toString().padStart(3, '0');
          taiwanYear + formattedValue.substring(4);
          obj.PlanTime = taiwanYear + formattedValue.substring(4);
        }
      }
      if (obj.hasOwnProperty('ExpiryDate')) {
        if (obj.ExpiryDate != null) {
          const formattedValue = moment(obj.ExpiryDate)
            .format('YYYYMMDD')
            .toString()
            .replace(/-/g, '');
          const year = parseInt(formattedValue.substring(0, 4), 10) - 1911;
          const taiwanYear = year.toString().padStart(3, '0');
          taiwanYear + formattedValue.substring(4);
          obj.ExpiryDate = taiwanYear + formattedValue.substring(4);
        }
      }
      if (obj.hasOwnProperty('Checkdate')) {
        if (obj.Checkdate != null) {
          const formattedValue = moment(obj.Checkdate)
            .format('YYYYMM')
            .toString()
            .replace(/-/g, '');
          obj.Checkdate = formattedValue;
        }
      }
      if (obj.hasOwnProperty('Makedate')) {
        if (obj.Makedate != null) {
          const formattedValue = moment(obj.Makedate)
            .format('YYYYMM')
            .toString()
            .replace(/-/g, '');
          obj.Makedate = formattedValue;
        }
      }
      if (obj.hasOwnProperty('ManualDeadline')) {
        if (obj.ManualDeadline != null) {
          const formattedValue = moment(obj.ManualDeadline)
            .format('YYYYMMDD')
            .toString()
            .replace(/-/g, '');
          const year = parseInt(formattedValue.substring(0, 4), 10) - 1911;
          const taiwanYear = year.toString().padStart(3, '0');
          taiwanYear + formattedValue.substring(4);
          obj.ManualDeadline = taiwanYear + formattedValue.substring(4);
        }
      }
      if (obj.hasOwnProperty('ConveneDate')) {
        if (obj.ConveneDate != null) {
          const formattedValue = moment(obj.ConveneDate)
            .format('YYYYMMDD')
            .toString()
            .replace(/-/g, '');
          const year = parseInt(formattedValue.substring(0, 4), 10) - 1911;
          const taiwanYear = year.toString().padStart(3, '0');
          taiwanYear + formattedValue.substring(4);
          obj.ConveneDate = taiwanYear + formattedValue.substring(4);
        }
      }
    });
    let extractedData = [];
    cloudData.forEach((obj) => {
      let values = [];
      for (let key in obj) {
        values.push(obj[key]);
      }
      extractedData.push(values);
    });
    const combinedData = [...templateData, ...extractedData];
    // console.log(combinedData);
    props.setLoading(false);
    await this.processTemplateAndExport(templatePath, extractedData, name2);
    // this.exportToExcel(combinedData, name2);
  };
  // async exportToExcel(data, fileName) {
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet('雲端資料平台');

  //   for (let i = 0; i < data.length; i++) {
  //     worksheet.addRow(data[i]);
  //   }

  //   const buffer = await workbook.xlsx.writeBuffer();
  //   const blob = new Blob([buffer], { type: 'application/octet-stream' });
  //   saveAs(blob, `${fileName}.xlsx`);
  // }
  async processTemplateAndExport(templatePath, data, fileName) {
    const workbook = new ExcelJS.Workbook();
    const response = await fetch(templatePath);
    const arrayBuffer = await response.arrayBuffer();
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow((row, rowNumber) => {
      row.splice(1, 0, '不合規原因'); // 插入到第一列位置
      const cell = row.getCell(1);
      cell.value = '不合規原因';
      cell.font = { name: 'Sego UI', bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
    data.forEach((rowData) => {
      worksheet.addRow(rowData);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `${fileName}.xlsx`);
  }
  render() {
    const { props } = this;
    return (
      <div className="cloud-data-action-cell2">
        <div className="action-button-container">
          <ButtonDiv className="c-button" onClick={this.openModal}>
            {props.language.cloudDataActionCell.import}
          </ButtonDiv>
          <NavLink className="action-button" to={this.openEdit()}>
            {props.language.cloudDataActionCell2.edit}
          </NavLink>
          <ButtonDiv className="action-button" onClick={this.download}>
            {props.language.cloudDataActionCell2.download}
          </ButtonDiv>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

CloudDataEditActionCell.defaultProps = {
  limitSize: true,
  sizeLimitInMb: 50,
};

CloudDataEditActionCell.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  cell: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  sizeLimitInMb: PropTypes.number,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CloudDataEditActionCell),
);
