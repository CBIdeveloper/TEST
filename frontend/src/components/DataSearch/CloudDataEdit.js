import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import Container from '../../lib/components/Container/Container';
import PageTitle from '../../lib/components/PageTitle/PageTitle';
import QueryType from '../../utils/types/QueryType';
import ButtonDiv from '../../../src/lib/components/ButtonDiv/ButtonDiv';
import { setLoading } from '../../store/loading/slice';
import '@progress/kendo-theme-default/dist/default-turquoise.scss';
import { Spreadsheet } from '@progress/kendo-react-spreadsheet';
import { loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';
import deMessages from './de.json';
import { cloudDataEditData } from './CloudDataEdit-data';
import ModalHelper from '../../../src/utils/helper/ModalHelper';
import './CloudDataEdit.scss';
import ApiService from '../../utils/api/ApiService';
import hr_civildefensemanpower from '../../utils/config/cloudDataEdit/1_hr_civildefensemanpower/hrCivildefensemanpowerConfig';
import hr_firemanpower from '../../utils/config/cloudDataEdit/3_hr_firemanpower/hrFiremanpowerConfig';
import hr_trafficmanpower from '../../utils/config/cloudDataEdit/5_hr_trafficmanpower/hrTrafficmanpowerConfig';
import hr_subserviceman from '../../utils/config/cloudDataEdit/7_hr_subserviceman/hrSubservicemanConfig';
import hr_majorproductmanpower from '../../utils/config/cloudDataEdit/9_hr_majorproductmanpower/hrMajorproductmanpowerConfig';
import fr_veteranshomes from '../../utils/config/cloudDataEdit/11_fr_veteranshomes/frVeteranshomesConfig';
import hr_vehicledriver from '../../utils/config/cloudDataEdit/12_hr_vehicledriver/hrVehicledriverConfig';
import hr_vehicledriverplan from '../../utils/config/cloudDataEdit/13_hr_vehicledriverplan/hrVehicledriverPlanConfig';
import hr_car_repairman from '../../utils/config/cloudDataEdit/14_hr_car_repairman/hrCarRepairmanConfig';
import fr_vehicletransport from '../../utils/config/cloudDataEdit/16_fr_vehicletransport/frVehicletransportConfig';
import hr_watertransportman from '../../utils/config/cloudDataEdit/17_hr_watertransportman/hrWatertransportmanConfig';
import fr_business_ship from '../../utils/config/cloudDataEdit/18_fr_business_ship/frBusinessShipConfig';
import fr_containerfield from '../../utils/config/cloudDataEdit/19_fr_containerfield/frContainerfieldConfig';
import hr_ac_drone_operator from '../../utils/config/cloudDataEdit/20_hr_ac_drone_operator/hrAcDroneOperatorConfig';
import hr_ac_drone_operatorplan from '../../utils/config/cloudDataEdit/21_hr_ac_drone_operatorplan/hrAcDroneOperatorPlanConfig';
import fr_aircraft from '../../utils/config/cloudDataEdit/22_fr_aircraft/frAircraftConfig';
import fr_drone from '../../utils/config/cloudDataEdit/23_fr_drone/frDroneConfig';
import hr_heavymachinerydriver from '../../utils/config/cloudDataEdit/24_hr_heavymachinerydriver/hrHeavymachinerydriverConfig';
import hr_heavymachinerydriverplan from '../../utils/config/cloudDataEdit/25_hr_heavymachinerydriverplan/hrHeavymachinerydriverPlanConfig';
import fr_heavymachinery from '../../utils/config/cloudDataEdit/26_fr_heavymachinery/frHeavymachineryConfig';
import hr_fisherman from '../../utils/config/cloudDataEdit/27_hr_fisherman/hrFishermanConfig';
import fr_fishing_ship from '../../utils/config/cloudDataEdit/28_fr_fishing_ship/frFishingShipConfig';
import fr_RF_equip from '../../utils/config/cloudDataEdit/29_fr_RF_equip/frRFEquipConfig';
import fr_dedicated_telecom from '../../utils/config/cloudDataEdit/30_fr_dedicated_telecom/frDedicatedTelecomConfig';
import fr_telecom_business from '../../utils/config/cloudDataEdit/31_fr_telecom_business/frTelecomBusinessConfig';
import fr_majormaterial from '../../utils/config/cloudDataEdit/32_fr_majormaterial/frMajormaterialConfig';
import fr_storehouse from '../../utils/config/cloudDataEdit/33_fr_storehouse/frStorehouseConfig';
import fr_activitycenter from '../../utils/config/cloudDataEdit/34_fr_activitycenter/frActivitycenterConfig';
import fr_religiousplace from '../../utils/config/cloudDataEdit/35_fr_religiousplace/frReligiousplaceConfig';
import fr_school from '../../utils/config/cloudDataEdit/36_fr_school/frSchoolConfig';
import fr_majorindustry from '../../utils/config/cloudDataEdit/37_fr_majorindustry/frMajorindustryConfig';
import fr_coal from '../../utils/config/cloudDataEdit/38_fr_coal/frCoalConfig';
import fr_oil from '../../utils/config/cloudDataEdit/39_fr_oil/frOilConfig';
import fr_gas from '../../utils/config/cloudDataEdit/40_fr_gas/frGasConfig';
import fr_reservoir from '../../utils/config/cloudDataEdit/41_fr_reservoir/frReservoirConfig';
import fr_water_purify from '../../utils/config/cloudDataEdit/42_fr_water_purify/frWaterPurifyConfig';
import fr_backup_well from '../../utils/config/cloudDataEdit/43_fr_backup_well/frBackupWellConfig';
import fr_food from '../../utils/config/cloudDataEdit/44_fr_food/frFoodConfig';
import hr_reservist from '../../utils/config/cloudDataEdit/45_hr_reservist/hrReservistConfig';
import hr_techman from '../../utils/config/cloudDataEdit/46_hr_techman/hrTechmanConfig';
import hr_techmanplan from '../../utils/config/cloudDataEdit/47_hr_techmanplan/hrTechmanPlanConfig';
import fr_chemical_protect from '../../utils/config/cloudDataEdit/48_fr_chemical_protect/frChemicalProtectConfig';
import fr_chemical_protectplan from '../../utils/config/cloudDataEdit/49_fr_chemical_protectplan/frChemicalProtectPlanConfig';
import hr_radiationman from '../../utils/config/cloudDataEdit/50_hr_radiationman/hrRadiationmanConfig';
import fr_radiation_protect from '../../utils/config/cloudDataEdit/52_fr_radiation_protect/frRadiationProtectConfig';
import fr_radiation_protectplan from '../../utils/config/cloudDataEdit/53_fr_radiation_protectplan/frRadiationProtectPlanConfig';
import hr_medicalman from '../../utils/config/cloudDataEdit/54_hr_medicalman/hrMedicalmanConfig';
import fr_medicine from '../../utils/config/cloudDataEdit/56_fr_medicine/frMedicineConfig';
import hr_military_medicalman from '../../utils/config/cloudDataEdit/57_hr_military_medicalman/hrMilitaryMedicalmanConfig';
import manPowerPlan from '../../utils/config/cloudDataEdit/manPowerPlan/manPowerPlanConfig';
import { getFirstlevelUnitId } from '../../utils/auth/auth';

class CloudDataEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      dataList: [],
      dataLength: null,
      titleMapByName: new Map(),
      dtoKeyDatas: null,
      customTabs: [
        {
          text: '',
          selected: true,
          tools: [],
        },
      ],
    };
    this.spreadsheetRef = React.createRef();
    this.handlePaste = this.handlePaste.bind(this);
  }
  setCode = (code) => {
    this.setState({ code });
  };

  setDataLength = (dataLength) => {
    this.setState({ dataLength });
  };
  setDtoKeyDatas = (dtoKeyDatas) => {
    this.setState({ dtoKeyDatas });
  };
  setDataList = async (dataList) => {
    await this.setState({ dataList });
  };

  componentDidMount() {
    loadMessages(deMessages, 'de');
    document.addEventListener('paste', this.handlePaste);
    this.initState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query.queryObject !== this.props.query.queryObject) {
      this.initState();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.handlePaste);
  }

  convertExcelDateToJSDate = (excelDate) => {
    if (!excelDate) return null;
    const taiwanYear = excelDate.substring(0, 3);
    const restOfDate = excelDate.substring(3);
    const westernYear = (parseInt(taiwanYear, 10) + 1911).toString();
    const formattedDate = westernYear + restOfDate;
    return moment(formattedDate, 'YYYYMMDD').format('YYYY-MM-DD');
  };

  setTimeout = () => {
    const spreadsheet = this.spreadsheetRef.current;
    if (spreadsheet) {
      const sheet = spreadsheet.activeSheet();
      if (sheet) {
        this.protectColumn(sheet, 0);
        this.protectColumn(sheet, 1);
        this.protectRow(sheet, 0);
      }
    }
  };

  initState = async () => {
    const { props } = this;
    const code = props.query.queryObject.get(QueryType.CODE);
    const id = props.query.queryObject.get(QueryType.ID);
    props.setLoading(true);
    if (code) {
      this.setCode(code);
      try {
        const response =
          await ApiService.cloudDataEditService.cloudDataEditData(code);

        let cloudData = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].FirstlevelUnitId == getFirstlevelUnitId()) {
            cloudData.push(response.data[i]);
          }
        }
        // console.log(CreatedUserAccountId)
        this.findName(cloudData, code);
        this.setDataList(cloudData);
        cloudData.length = cloudData.length + 100;
        if (this.spreadsheetRef.current) {
          const sheet = this.spreadsheetRef.current.activeSheet();
          if (sheet) {
            sheet.resize(cloudData.length || 0, 50);
          }
        }
        this.setDataLength(cloudData.length);
        props.setLoading(false);
      } catch (error) {
        console.error('API call failed', error);
      }
    } else {
      console.log('Code is not available yet.');
    }
  };

  checkValid(id) {
    const regexID = /^[A-Z]{1}[0-9]{9}$/; // 身分證
    let isID = false;
    try {
      if (!regexID.test(id)) {
        return false;
      }
      const charMapping = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
      let seed = new Array(10).fill(0);
      if (regexID.test(id)) {
        let index = charMapping.indexOf(id[0]) + 10;
        seed[0] = Math.floor(index / 10);
        seed[1] = (index % 10) * 9;
        for (let i = 2; i < id.length; i++) {
          seed[i] = parseInt(id[i - 1]) * (10 - i);
        }
        isID =
          (10 - (seed.reduce((a, b) => a + b, 0) % 10)) % 10 ===
          parseInt(id[9]);
      }
      return isID;
    } catch (ex) {
      console.error(ex.toString());
      return false;
    }
  }

  checkOutterValid(id) {
    const regexARC = /^[A-Z]{1}[A-D]{1}[0-9]{8}$/; // 外僑統一證號
    let isARC = false;

    try {
      if (!regexARC.test(id)) {
        return false;
      }
      const charMapping = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
      let seedARC = new Array(10).fill(0);
      if (regexARC.test(id)) {
        let index = charMapping.indexOf(id[0]) + 10;
        seedARC[0] = Math.floor(index / 10);
        seedARC[1] = (index % 10) * 9;

        index = charMapping.indexOf(id[1]);
        seedARC[2] = (index % 10) * 8;

        for (let i = 3; i < id.length; i++) {
          seedARC[i] = parseInt(id[i - 1]) * (10 - i);
        }
        isARC =
          (10 - (seedARC.reduce((a, b) => a + b, 0) % 10)) % 10 ===
          parseInt(id[9]);
      }
      return isARC;
    } catch (ex) {
      console.error(ex.toString());
      return false;
    }
  }

  isValidUnifiedNumber(id) {  //統一編號檢查
    if (!/^\d{8}$/.test(id)) return false;

    const weights = [1, 2, 1, 2, 1, 2, 4, 1];
    let sum = 0;
  
    for (let i = 0; i < id.length; i++) {
      let product = id[i] * weights[i];
      sum += Math.floor(product / 10) + (product % 10);
    }
  
    //return sum % 10 === 0 || (id[6] === '7' && (sum + 1) % 10 === 0); //舊版 sum 整除10
    return sum % 5 === 0 || (id[6] === '7' && (sum + 1) % 5 === 0);     //新版 sum 整除5
  }


  openReturnModal = () => {
    ModalHelper.openReturnModal({});
  };

  openSaveModal = async () => {
    const { props } = this;
    let dataLength = this.state.dataLength;
    const code = this.state.code;
    const id = props.query.queryObject.get(QueryType.ID);
    try {
      await this.saveToJSONinPromise();
      await this.loadFromJSON();
      cloudDataEditData[0].rows.splice(dataLength + 1);
      const dtoKeyDatas = this.state.dtoKeyDatas;
      const currentYear = new Date().getFullYear();
      const currentROCYear = new Date().getFullYear() - 1911;
      let updatedDtoKeyDatas = dtoKeyDatas.map((item) => {
        if (
          item.Pid &&
          !item.NonComplianceReason.includes('身分證') &&
          (code == '044' ||
            code == '015' ||
            code == '016' ||
            code == '012')
        ) {
          const isCorrect = this.checkOutterValid(item.Pid);
          if (!isCorrect) {
            item.NonComplianceReason += "'身分證字號'格式錯誤;";
          }
        } else if (item.Pid && !item.NonComplianceReason.includes('身分證')) {
          const isCorrect = this.checkValid(item.Pid);
          if (!isCorrect) {
            if(code == '010'){  //車輛輸具 身分證字號(統一編號)
              const isCorrect2 = this.isValidUnifiedNumber(item.Pid);
              if (!isCorrect2){
                item.NonComplianceReason += "'身分證字號(統一編號)'格式錯誤;";
              }
            }else{
              item.NonComplianceReason += "'身分證字號'格式錯誤;";
            }
          }
        }
        if (item.LicensePlate) {
          const hasChinese = /[\u4e00-\u9fff]/.test(item.LicensePlate);
          if (hasChinese) {
            item.LicensePlate = '';
            item.NonComplianceReason += "'車牌號碼'格式錯誤";
          }
        }
        if (item.Registerno) {
          const hasChinese = /[\u4e00-\u9fff]/.test(item.Registerno);
          if (hasChinese) {
            item.Registerno = '';
            item.NonComplianceReason += "'註冊號碼'格式錯誤";
          }
        }
        if (item.Birthdate) {
          item.Birthdate = item.Birthdate.toString();
          if (item.Birthdate.length == 6) {
            item.Birthdate = '0' + item.Birthdate;
          }
        }
        if (item.Enterdate) {
          item.Enterdate = item.Enterdate.toString();
          if (item.Enterdate.length == 6) {
            item.Enterdate = '0' + item.Enterdate;
          }
        }
        if (item.Retiredate) {
          item.Retiredate = item.Retiredate.toString();
          if (item.Retiredate.length == 6) {
            item.Retiredate = '0' + item.Retiredate;
          }
        }
        if (item.PlanStart) {
          item.PlanStart = item.PlanStart.toString();
          if (item.PlanStart.length == 6) {
            item.PlanStart = '0' + item.PlanStart;
          }
        }
        if (item.PlanEnd) {
          item.PlanEnd = item.PlanEnd.toString();
          if (item.PlanEnd.length == 6) {
            item.PlanEnd = '0' + item.PlanEnd;
          }
        }
        if (item.Approvaldate) {
          item.Approvaldate = item.Approvaldate.toString();
          if (item.Approvaldate.length == 6) {
            item.Approvaldate = '0' + item.Approvaldate;
          }
        }
        if (item.PlanTime) {
          item.PlanTime = item.PlanTime.toString();
          if (item.PlanTime.length == 6) {
            item.PlanTime = '0' + item.PlanTime;
          }
        }
        if (item.ExpiryDate) {
          item.ExpiryDate = item.ExpiryDate.toString();
          if (item.ExpiryDate.length == 6) {
            item.ExpiryDate = '0' + item.ExpiryDate;
          }
        }
        if (item.Checkdate) {
          item.Checkdate = item.Checkdate.toString();
          if (item.Checkdate.length == 6) {
            const year = item.Checkdate.slice(0, 4);
            const month = item.Checkdate.slice(4, 6);
            item.Checkdate = `${year}-${month}-01`;
          } else {
            item.Checkdate = '';
            item.NonComplianceReason + "'出廠年份'格式錯誤;";
          }
        }
        if (item.Makedate) {
          item.Makedate = item.Makedate.toString();
          if (item.Makedate.length == 6) {
            const year = item.Makedate.slice(0, 4);
            const month = item.Makedate.slice(4, 6);
            item.Makedate = `${year}-${month}-01`;
          } else {
            item.Makedate = '';
            item.NonComplianceReason + "'定檢日期'格式錯誤;";
          }
        }
        if (item.ManualDeadline) {
          item.ManualDeadline = item.ManualDeadline.toString();
          if (item.ManualDeadline.length == 6) {
            item.ManualDeadline = '0' + item.ManualDeadline;
          }
        }
        if (item.ConveneDate) {
          item.ConveneDate = item.ConveneDate.toString();
          if (item.ConveneDate.length == 6) {
            item.ConveneDate = '0' + item.ConveneDate;
          }
        }
        if (item.Birthdate && item.Birthdate.length != 7) {
          item.Birthdate = undefined;
          item.NonComplianceReason =
            item.NonComplianceReason + "'出生年月日'格式錯誤;";
        } else if (item.Birthdate) {
          // console.log(typeof(item.Birthdate))
          const birthYearROC = parseInt(item.Birthdate.substring(0, 3), 10);
          const birthMonth = parseInt(item.Birthdate.substring(3, 5), 10);
          const birthDay = parseInt(item.Birthdate.substring(5, 7), 10);
          if (
            birthYearROC > currentROCYear ||
            birthMonth < 1 ||
            birthMonth > 12 ||
            birthDay < 1 ||
            birthDay > 31
          ) {
            item.Birthdate = '';
            // console.log(item.Birthdate)
            item.NonComplianceReason =
              item.NonComplianceReason + "'出生年月日'格式錯誤;";
          } else {
            item.Birthdate = this.convertExcelDateToJSDate(item.Birthdate);
          }
        }
        if (item.Enterdate && item.Enterdate.length != 7) {
          item.Enterdate = '';
          item.NonComplianceReason =
            item.NonComplianceReason + "'入營日期'格式錯誤;";
        } else if (item.Enterdate) {
          const birthYearROC = parseInt(item.Enterdate.substring(0, 3), 10);
          const birthMonth = parseInt(item.Enterdate.substring(3, 5), 10);
          const birthDay = parseInt(item.Enterdate.substring(5, 7), 10);
          if (
            birthYearROC > currentROCYear ||
            birthMonth < 1 ||
            birthMonth > 12 ||
            birthDay < 1 ||
            birthDay > 31
          ) {
            item.Enterdate = '';
            item.NonComplianceReason =
              item.NonComplianceReason + "'入營日期'格式錯誤;";
          } else {
            item.Enterdate = this.convertExcelDateToJSDate(item.Enterdate);
          }
        }
        if (item.Retiredate && item.Retiredate.length != 7) {
          item.Retiredate = '';
          if (code == '037') {
            item.NonComplianceReason =
              item.NonComplianceReason + "'離營日期'格式錯誤;";
          } else {
            item.NonComplianceReason =
              item.NonComplianceReason + "'退役日期'格式錯誤;";
          }
        } else if (item.Retiredate) {
          const birthYearROC = parseInt(item.Retiredate.substring(0, 3), 10);
          const birthMonth = parseInt(item.Retiredate.substring(3, 5), 10);
          const birthDay = parseInt(item.Retiredate.substring(5, 7), 10);
          if (
            birthMonth < 1 ||
            birthMonth > 12 ||
            birthDay < 1 ||
            birthDay > 31
          ) {
            item.Retiredate = '';
            if (code == '037') {
              item.NonComplianceReason =
                item.NonComplianceReason + "'離營日期'格式錯誤;";
            } else {
              item.NonComplianceReason =
                item.NonComplianceReason + "'退役日期'格式錯誤;";
            }
          } else {
            item.Retiredate = this.convertExcelDateToJSDate(item.Retiredate);
          }
        }
        if (item.PlanStart && item.PlanStart.length != 7) {
          item.PlanStart = '';
          item.NonComplianceReason =
            item.NonComplianceReason + "'演訓時間(起)'格式錯誤;";
        } else if (item.PlanStart) {
          const birthYearROC = parseInt(item.PlanStart.substring(0, 3), 10);
          const birthMonth = parseInt(item.PlanStart.substring(3, 5), 10);
          const birthDay = parseInt(item.PlanStart.substring(5, 7), 10);
          console.log('birthYearROC', birthYearROC);
          if (
            birthMonth < 1 ||
            birthMonth > 12 ||
            birthDay < 1 ||
            birthDay > 31
          ) {
            item.PlanStart = '';
            item.NonComplianceReason =
              item.NonComplianceReason + "'演訓時間(起)'格式錯誤;";
          } else {
            item.PlanStart = this.convertExcelDateToJSDate(item.PlanStart);
          }
        }
        if (item.PlanEnd && item.PlanEnd.length != 7) {
          item.PlanEnd = '';
          item.NonComplianceReason =
            item.NonComplianceReason + "'演訓時間(迄)'格式錯誤;";
        } else if (item.PlanEnd) {
          const birthYearROC = parseInt(item.PlanEnd.substring(0, 3), 10);
          const birthMonth = parseInt(item.PlanEnd.substring(3, 5), 10);
          const birthDay = parseInt(item.PlanEnd.substring(5, 7), 10);
          if (
            birthMonth < 1 ||
            birthMonth > 12 ||
            birthDay < 1 ||
            birthDay > 31
          ) {
            item.PlanEnd = '';
            item.NonComplianceReason =
              item.NonComplianceReason + "'演訓時間(迄)'格式錯誤;";
          } else {
            item.PlanEnd = this.convertExcelDateToJSDate(item.PlanEnd);
          }
        }
        if (item.Approvaldate && item.Approvaldate.length != 7) {
          item.Approvaldate = '';
          item.NonComplianceReason =
            item.NonComplianceReason + "'審定日期'格式錯誤;";
        } else if (item.Approvaldate) {
          const birthYearROC = parseInt(item.Approvaldate.substring(0, 3), 10);
          const birthMonth = parseInt(item.Approvaldate.substring(3, 5), 10);
          const birthDay = parseInt(item.Approvaldate.substring(5, 7), 10);
          if (
            birthMonth < 1 ||
            birthMonth > 12 ||
            birthDay < 1 ||
            birthDay > 31
          ) {
            item.Approvaldate = '';
            item.NonComplianceReason =
              item.NonComplianceReason + "'審定日期'格式錯誤;";
          } else {
            item.Approvaldate = this.convertExcelDateToJSDate(
              item.Approvaldate,
            );
          }
        }
        if (item.PlanTime && item.PlanTime.length != 7) {
          item.PlanTime = '';
          item.NonComplianceReason =
            item.NonComplianceReason + "'演訓時間'格式錯誤;";
        } else if (item.PlanTime) {
          const birthYearROC = parseInt(item.PlanTime.substring(0, 3), 10);
          const birthMonth = parseInt(item.PlanTime.substring(3, 5), 10);
          const birthDay = parseInt(item.PlanTime.substring(5, 7), 10);
          if (
            birthMonth < 1 ||
            birthMonth > 12 ||
            birthDay < 1 ||
            birthDay > 31
          ) {
            item.PlanTime = '';
            item.NonComplianceReason =
              item.NonComplianceReason + "'演訓時間'格式錯誤;";
          } else {
            item.PlanTime = this.convertExcelDateToJSDate(item.PlanTime);
          }
        }
        if (item.ExpiryDate && item.ExpiryDate.length != 7) {
          item.ExpiryDate = '';
          item.NonComplianceReason =
            item.NonComplianceReason + "'有效日期'格式錯誤;";
        } else if (item.ExpiryDate) {
          const birthYearROC = parseInt(item.ExpiryDate.substring(0, 3), 10);
          const birthMonth = parseInt(item.ExpiryDate.substring(3, 5), 10);
          const birthDay = parseInt(item.ExpiryDate.substring(5, 7), 10);
          if (
            birthMonth < 1 ||
            birthMonth > 12 ||
            birthDay < 1 ||
            birthDay > 31
          ) {
            item.ExpiryDate = '';
            item.NonComplianceReason =
              item.NonComplianceReason + "'有效日期'格式錯誤;";
          } else {
            item.ExpiryDate = this.convertExcelDateToJSDate(item.ExpiryDate);
          }
        }
        if (item.ManualDeadline && item.ManualDeadline.length != 7) {
          item.ManualDeadline = '';
          item.NonComplianceReason =
            item.NonComplianceReason + "'手冊期限'格式錯誤;";
        } else if (item.ManualDeadline) {
          const birthYearROC = parseInt(
            item.ManualDeadline.substring(0, 3),
            10,
          );
          const birthMonth = parseInt(item.ManualDeadline.substring(3, 5), 10);
          const birthDay = parseInt(item.ManualDeadline.substring(5, 7), 10);
          if (
            birthMonth < 1 ||
            birthMonth > 12 ||
            birthDay < 1 ||
            birthDay > 31
          ) {
            item.ManualDeadline = '';
            item.NonComplianceReason =
              item.NonComplianceReason + "'手冊期限'格式錯誤;";
          } else {
            item.ManualDeadline = this.convertExcelDateToJSDate(
              item.ManualDeadline,
            );
          }
        }
        if (item.ConveneDate && item.ConveneDate.length != 7) {
          item.ConveneDate = '';
          item.NonComplianceReason =
            item.NonComplianceReason + "'教召日期'格式錯誤;";
        } else if (item.ConveneDate) {
          const birthYearROC = parseInt(item.ConveneDate.substring(0, 3), 10);
          const birthMonth = parseInt(item.ConveneDate.substring(3, 5), 10);
          const birthDay = parseInt(item.ConveneDate.substring(5, 7), 10);
          if (
            birthMonth < 1 ||
            birthMonth > 12 ||
            birthDay < 1 ||
            birthDay > 31
          ) {
            item.ConveneDate = '';
            item.NonComplianceReason =
              item.NonComplianceReason + "'教召日期'格式錯誤;";
          } else {
            item.ConveneDate = this.convertExcelDateToJSDate(item.ConveneDate);
          }
        }
        return item;
      });
      updatedDtoKeyDatas = updatedDtoKeyDatas.filter((item) => {
        return Object.values(item).some(
          (value) => value !== '' && value !== undefined,
        );
      });
      updatedDtoKeyDatas.forEach((obj) => {
        if (obj.DeletedAt === 'V') {
          let currentDate = new Date();
          obj.DeletedAt = currentDate.toISOString().split('T')[0];
        }
      });
      console.log(updatedDtoKeyDatas);
      dataLength = updatedDtoKeyDatas.length;
      ModalHelper.openSaveModal({
        updatedDtoKeyDatas,
        dataLength,
        code,
        id,
      });
    } catch (error) {
      console.error('Error in openModal2:', error);
    }
  };
  /**getList */
  findName = (res, code) => {
    let titles = null;
    if (code == '001') {
      titles = hr_civildefensemanpower;
    } else if (code == '002') {
      titles = hr_firemanpower;
    } else if (code == '003') {
      titles = hr_trafficmanpower;
    } else if (code == '004') {
      titles = hr_subserviceman;
    } else if (code == '006') {
      titles = hr_majorproductmanpower;
    } else if (code == '007') {
      titles = fr_veteranshomes;
    } else if (code == '008') {
      titles = hr_vehicledriver;
    } else if (code == '009') {
      titles = hr_car_repairman;
    } else if (code == '010') {
      titles = fr_vehicletransport;
    } else if (code == '011') {
      titles = hr_watertransportman;
    } else if (code == '012') {
      titles = fr_business_ship;
    } else if (code == '013') {
      titles = fr_containerfield;
    } else if (code == '014') {
      titles = hr_ac_drone_operator;
    } else if (code == '015') {
      titles = fr_aircraft;
    } else if (code == '016') {
      titles = fr_drone;
    } else if (code == '017') {
      titles = hr_heavymachinerydriver;
    } else if (code == '018') {
      titles = fr_heavymachinery;
    } else if (code == '019') {
      titles = hr_fisherman;
    } else if (code == '020') {
      titles = fr_fishing_ship;
    } else if (code == '021') {
      titles = fr_RF_equip;
    } else if (code == '022') {
      titles = fr_dedicated_telecom;
    } else if (code == '023') {
      titles = fr_telecom_business;
    } else if (code == '024') {
      titles = fr_majormaterial;
    } else if (code == '025') {
      titles = fr_storehouse;
    } else if (code == '026') {
      titles = fr_activitycenter;
    } else if (code == '027') {
      titles = fr_religiousplace;
    } else if (code == '028') {
      titles = fr_school;
    } else if (code == '029') {
      titles = fr_majorindustry;
    } else if (code == '030') {
      titles = fr_coal;
    } else if (code == '031') {
      titles = fr_oil;
    } else if (code == '032') {
      titles = fr_gas;
    } else if (code == '033') {
      titles = fr_reservoir;
    } else if (code == '034') {
      titles = fr_water_purify;
    } else if (code == '035') {
      titles = fr_backup_well;
    } else if (code == '036') {
      titles = fr_food;
    } else if (code == '037') {
      titles = hr_reservist;
    } else if (code == '040') {
      titles = hr_techman;
    } else if (code == '041') {
      titles = fr_chemical_protect;
    } else if (code == '042') {
      titles = hr_radiationman;
    } else if (code == '043') {
      titles = fr_radiation_protect;
    } else if (code == '044') {
      titles = hr_medicalman;
    } else if (code == '045') {
      titles = fr_medicine;
    } else if (code == '046') {
      titles = hr_military_medicalman;
    } else if (
      code == '901' ||
      code == '902' ||
      code == '903' ||
      code == '904' ||
      code == '906' ||
      code == '909' ||
      code == '942' ||
      code == '944'
    ) {
      titles = manPowerPlan;
    } else if (code == '908') {
      titles = hr_vehicledriverplan;
    } else if (code == '914') {
      titles = hr_ac_drone_operatorplan;
    } else if (code == '917') {
      titles = hr_heavymachinerydriverplan;
    } else if (code == '940') {
      titles = hr_techmanplan;
    } else if (code == '941') {
      titles = fr_chemical_protectplan;
    } else if (code == '943') {
      titles = fr_radiation_protectplan;
    }
    // 標題新增
    const rows = [];
    const cells = [];
    const columns = [];
    const titleMapByName = new Map();
    for (let title of titles) {
      const cell = {
        value: title.name,
        textAlign: 'center',
        verticalAlign: 'center',
        color: title.color,
        background: title.background,
        fontSize: 16,
      };
      const column = {
        width: title.column,
      };
      cells.push(cell);
      columns.push(column);
      titleMapByName.set(title.name, title);
    }
    this.state.titleMapByName = titleMapByName;
    const titleRow = {
      height: 25,
      cells: cells,
    };
    rows.push(titleRow);
    // ===================

    // 後端提供的資料
    for (let data of res) {
      const cells = [];
      let backgroundColor;
      if (data.NonComplianceReason != '') {
        backgroundColor = 'rgb(255, 199, 199)';
      }
      for (let title of titles) {
        let value = data[title.value];
        const color = data[title.color];
        const background = data[title.background];
        const verticalAlign = title.verticalAlign;
        const format = title.format;
        const name = title.name;
        if (value && format == 'YYYY-MM-DD') {
          const formattedValue = moment(value)
            .format('YYYYMMDD')
            .toString()
            .replace(/-/g, '');
          const year = parseInt(formattedValue.substring(0, 4), 10) - 1911;
          const taiwanYear = year.toString().padStart(3, '0');
          value = taiwanYear + formattedValue.substring(4);
        }
        if (value && title.name == '出廠年份') {
          const formattedValue = moment(value)
            .format('YYYYMM')
            .toString()
            .replace(/-/g, '');
          value = formattedValue;
        }
        if (value && title.name == '定檢日期') {
          const formattedValue = moment(value)
            .format('YYYYMM')
            .toString()
            .replace(/-/g, '');
          value = formattedValue;
        }
        // console.log(title.name);
        let cell;
        cell = {
          value: value,
          textAlign: 'center',
          verticalAlign: verticalAlign ? 'top' : 'center',
          color: color,
          background: backgroundColor,
          fontSize: 16,
        };
        cells.push(cell);
      }
      const row = {
        height: 25,
        cells: cells,
      };
      rows.push(row);
    }
    // console.log(cloudDataEditData[0])
    cloudDataEditData[0].rows = rows;
    cloudDataEditData[0].columns = columns;
    this.loadFromJSON();
  };

  saveToJSONinPromise = () => {
    return new Promise((resolve, reject) => {
      const titleMapByName = this.state.titleMapByName;
      const listLength = this.state.listLength;
      if (this.spreadsheetRef.current) {
        this.spreadsheetRef.current
          .saveJSON()
          .then((data) => {
            try {
              const rows = data.sheets[0].rows;
              const titleCells = rows[0].cells;
              const titleMapByIndex = new Map();
              let idIndex = 0;
              // console.log(this.state.dataLength);
              let count = this.state.dataLength - 100 + 1;
              for (let i = count; i < rows.length; i++) {
                let cells = rows[i].cells;
                if (cells.length) {
                  let indices = cells.map((cell) => cell.index);
                  let maxIndex = Math.max(...indices);
                  let minIndex = Math.min(...indices);
                  let allIndices = new Set();
                  for (let i = minIndex; i <= maxIndex; i++) {
                    allIndices.add(i);
                  }
                  let missingIndices = [...allIndices].filter(
                    (index) => !indices.includes(index),
                  );
                  missingIndices.forEach((index) => {
                    cells.push({ index: index });
                  });
                  cells.sort((a, b) => a.index - b.index);
                  // let newCell = {value: '', index: 2};
                  // cells.splice(2, 0, newCell);
                  // cells.forEach((cell, i) => {
                  //   cell.index = i;
                  // });
                }
                // console.log(cells);
              }
              for (let index in titleCells) {
                const titleCell = titleCells[index];
                const name = titleCell.value;
                if (name === '编号') {
                  idIndex = index;
                }
                if (titleMapByName.has(name)) {
                  const title = titleMapByName.get(name);
                  titleMapByIndex.set(Number(index), title);
                }
              }
              // console.log('titleCells', titleCells)
              // console.log(titleMapByIndex.size);
              // console.log(titleCells.length);
              // console.log('rows[i].cells', rows[4]);

              const dtoKeyDatas = [];
              for (let i = 1; i < rows.length; i++) {
                let error = '';
                let cells = rows[i].cells;
                const id = cells[idIndex].value;
                // console.log('cells', cells);
                if (cells.length > 2) {
                  // console.log('titleMapByIndex', titleMapByIndex);
                  for (let j = 0; j < titleMapByIndex.size; j++) {
                    // console.log(
                    //   '![j]',
                    //   j,
                    //   titleMapByIndex.get(Number(j)),
                    //   cells[j],
                    // );
                    if (!cells[j]) {
                      cells[j] = { value: '', index: j };

                      // console.log(
                      //   'cells[j]',
                      //   cells[j]
                      // );
                    }
                  }
                }
                // console.log('cells2', cells);

                const dtoKeyData = {};
                for (let key in cells) {
                  const index = cells[key].index;
                  // console.log(index)
                  const title = titleMapByIndex.get(Number(index));
                  // console.log(titleMapByIndex.get(Number(index)).color)
                  const role = title.role;
                  const role2 = title.role2;
                  const role3 = title.role3;
                  const role4 = title.role4;
                  const role5 = title.role5;
                  const value = cells[key].value;
                  let isNull = false;
                  let correct = true;
                  let correct2 = true;
                  let correct3 = true;
                  let correct4 = true;
                  let correct5 = true;
                  // console.log(value)
                  if (
                    titleMapByIndex.get(Number(index)).color == 'rgb(255,0,0)'
                  ) {
                    if (value == '' || value == null || value == undefined) {
                      isNull = true;
                    }
                    // console.log(isNull)
                  }
                  if (role != undefined) {
                    correct = role.test(value);
                  }
                  if (role2 != undefined) {
                    correct2 = role2.test(value);
                  }
                  if (role3 != undefined) {
                    correct3 = role3.test(value);
                  }
                  if (
                    data.sheets[0].rows[i].cells[Number(key)].value != undefined
                  ) {
                    if (role4 != undefined) {
                      correct4 = role4.test(value);
                    }
                  }
                  if (
                    role5 != undefined &&
                    value != null &&
                    value != undefined &&
                    value != ''
                  ) {
                    correct5 = role5.test(value);
                  }
                  // console.log('titleMapByIndex.get(Number(index)).color',titleMapByIndex.get(Number(index)).color)
                  if (isNull) {
                    // console.log('1');
                    error += titleMapByIndex.get(Number(index)).error + ';';
                  }
                  if (!correct) {
                    error += titleMapByIndex.get(Number(index)).error2 + ';';
                  }
                  if (!correct2) {
                    error += titleMapByIndex.get(Number(index)).error3 + ';';
                  }
                  if (!correct3) {
                    data.sheets[0].rows[i].cells[Number(key)].value = '';
                    error += titleMapByIndex.get(Number(index)).error4 + ';';
                  }
                  if (!correct4) {
                    data.sheets[0].rows[i].cells[Number(key)].value = '';
                    error += titleMapByIndex.get(Number(index)).error4 + ';';
                  }
                  if (!correct5) {
                    data.sheets[0].rows[i].cells[Number(key)].value = '';
                    error += titleMapByIndex.get(Number(index)).error5 + ';';
                  }
                  // console.log(error);
                  data.sheets[0].rows[i].cells[1].value = null;
                }
                data.sheets[0].rows[i].cells[1].value = error;

                // console.log('cells3',cells);

                for (let key in cells) {
                  const index = cells[key].index;
                  const title = titleMapByIndex.get(Number(index));
                  const dtoKey = title.value;
                  dtoKeyData[dtoKey] = cells[key].value;
                }
                dtoKeyDatas.push(dtoKeyData);
              }
              this.setDtoKeyDatas(dtoKeyDatas);
              // console.log('dtoKeyDatas',dtoKeyDatas);
              const rows2 = [];
              const cells = [];

              for (let i = 0; i < listLength; i++) {
                const titles = data.sheets[0].rows[i].cells;
                for (let title of titles) {
                  if (title.value !== undefined) {
                    if (
                      title.value &&
                      title.format == 'YYYY-MM-DD' &&
                      title.value.toString().length == 7
                    ) {
                      const formattedValue = moment(title.value)
                        .format('YYYYMMDD')
                        .toString()
                        .replace(/-/g, '');
                      const year =
                        parseInt(formattedValue.substring(0, 4), 10) - 1911;
                      const taiwanYear = year.toString().padStart(3, '0');
                      title.value = taiwanYear + formattedValue.substring(4);
                    }
                    const cell = {
                      value: title.value,
                      textAlign: 'center',
                      verticalAlign: 'center',
                      color: title.color,
                      background: title.background,
                      fontSize: 16,
                    };
                    cells.push(cell);
                  }
                }
              }

              const row = {
                height: 25,
                cells: cells,
              };
              rows2.push(row);
              for (let i = 0; i < listLength; i++) {
                const titles = data.sheets[0].rows[i].cells;
                for (let title of titles) {
                  if (title.value !== undefined) {
                  }
                }
              }
              cloudDataEditData[0].rows = rows;
              resolve();
            } catch (error) {
              reject(error);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error('Spreadsheet reference is not available'));
      }
    });
  };

  loadFromJSON = () => {
    return new Promise((resolve, reject) => {
      try {
        if (this.spreadsheetRef.current) {
          this.spreadsheetRef.current.fromJSON({
            sheets: cloudDataEditData,
          });
          this.setTimeout();
          resolve();
        } else {
          reject(new Error('Spreadsheet reference is not available'));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  protectColumn = (sheet, columnIndex) => {
    sheet
      .range(
        `${String.fromCharCode(65 + columnIndex)}1:${String.fromCharCode(
          65 + columnIndex,
        )}${sheet._rows._count}`,
      )
      .enable(false);
  };

  protectRow = (sheet, rowIndex) => {
    const rowNumber = rowIndex + 1;
    const lastColumn = sheet._columns._count;
    const lastColumnLetter = this.getColumnLetter(lastColumn - 1);
    sheet.range(`A${rowNumber}:${lastColumnLetter}${rowNumber}`).enable(false);
  };

  getColumnLetter = (columnIndex) => {
    let letter = '';
    while (columnIndex >= 0) {
      letter = String.fromCharCode((columnIndex % 26) + 65) + letter;
      columnIndex = Math.floor(columnIndex / 26) - 1;
    }
    return letter;
  };

  handleSelect = (sel) => {
    // console.log(sel.range._ref)
    if (sel.range._ref.col == 2 && sel.range._ref.row > 0) {
      const currentValue = sel.range.value();
      if (currentValue === 'V') {
        sel.range.value('');
      } else {
        sel.range.value('V');
      }
    }
  };

  handleChange = (sel) => {
    if (sel.range._ref.col == 2) {
      sel.range._ref.col = 0;
    }
  };

  handlePaste = (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const items = clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file' && items[i].type.startsWith('image/')) {
        event.preventDefault();
        alert('請勿填入圖片');
        return;
      }
    }
  };

  render() {
    const { props, state } = this;
    // console.log(state.dataLength);
    return (
      <div className="cloud-data-edit">
        <Container breadcrumb={false}>
          <PageTitle title={'雲端資料編輯'} />
          <div className="mobilization-container">
            <div className="plan-name">
              {'編管類別:' + props.query.queryObject.get(QueryType.NAME)}
            </div>
            <div className="correct">
              {'合規筆數:' + props.query.queryObject.get(QueryType.CQ)}
            </div>
            <div className="correct">
              {'不合規筆數:' + props.query.queryObject.get(QueryType.NCQ)}
            </div>
          </div>
          <div className="waring-button">
            <div className="waring">
              {
                '▲資料編輯完成「存檔」後，系統將重新統計「合規」及「不合規」筆數，並自動更新「不合規資料原因」'
              }
              <br />
              {'▲「ID」欄位及「不合規原因」為系統自動更新，故欄位不可異動。'}
            </div>
            <div className="edit-button">
              <ButtonDiv className="return" onClick={this.openReturnModal}>
                {'回上一頁'}
              </ButtonDiv>
              <ButtonDiv className="save" onClick={this.openSaveModal}>
                {'存檔'}
              </ButtonDiv>
            </div>
          </div>
          <LocalizationProvider language="de">
            <Spreadsheet
              ref={this.spreadsheetRef}
              style={{
                width: '100%',
                height: 680,
              }}
              toolbar={state.customTabs}
              defaultProps={{
                sheets: cloudDataEditData,
                rows: 200,
              }}
              onSelect={this.handleSelect}
              onChange={this.handleChange}
            />
          </LocalizationProvider>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language.languageInfo.languageObject,
  query: state.route.query,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (payload) => dispatch(setLoading(payload)),
});

CloudDataEdit.propTypes = {
  language: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  query: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CloudDataEdit);
