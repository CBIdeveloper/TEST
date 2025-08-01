import BraidingItem from '../baseModels/BraidingItem';
import ConfigListItem from '../baseModels/ConfigListItem';
import KeyListItem from '../baseModels/KeyListItem';

import ApiService from '../../../api/ApiService';

const hrMilitaryMedicalmanConfig = new BraidingItem({
  id: 57,
  code: '046',
  name: '軍醫人力',
  type: '人力',
  typeIndex: '1',
  mobilizationPlan: '衛生動員方案',
  mobilizationPlanId: 8,
  mobilizationClassification: '國軍醫療',
  mobilizationClassificationId: 56,
  firstLevelAgency: '國防部',
  firstLevelAgencyId: '',
  secondaryAgency: '軍醫局',
  secondaryAgencyId: '',

  fetchDetailData: (id) =>
    ApiService.hrMilitaryMedicalman.readHrMilitaryMedicalmanById(id),
  fetchCategoryData:
    ApiService.hrMilitaryMedicalman.readHrMilitaryMedicalmanPagination,
  queryCategoryData:
    ApiService.hrMilitaryMedicalman.readHrMilitaryMedicalmanQueryPagination,

  fetchUniqueDetailData: (id) =>
    ApiService.hrMilitaryMedicalman.readUniqueHrMilitaryMedicalmanById(id),
  fetchUniqueCategoryData:
    ApiService.hrMilitaryMedicalman.readUniqueHrMilitaryMedicalmanPagination,
  queryUniqueCategoryData:
    ApiService.hrMilitaryMedicalman
      .readUniqueHrMilitaryMedicalmanQueryPagination,

  configList: [
    new ConfigListItem({
      sectionTitle: '基本資料',
      keyList: [
        new KeyListItem({ key: 'name', keyTitle: '姓名' }),
        new KeyListItem({ key: 'pid', keyTitle: '身分證字號' }),
        new KeyListItem({ key: 'unit', keyTitle: '單位' }),
        new KeyListItem({ key: 'militaryType', keyTitle: '軍種' }),
        new KeyListItem({ key: 'militaryClass', keyTitle: '階級' }),
      ],
    }),
  ],
  planConfigList: [],
  categoryTableHeader: [
    {
      Header: '姓名',
      accessor: 'name',
    },
    {
      Header: '身分證字號',
      accessor: 'pid',
    },
  ],
  criteriaList: [
    {
      id: 1,
      chineseField: '序號',
      englishField: 'id',
      dataType: '',
      type: 'int',
      length: '',
      remark: 'PK',
    },
    {
      id: 2,
      chineseField: '姓名',
      englishField: 'name',
      dataType: '基本資料',
      type: 'nvarchar',
      length: 200,
      remark:
        '【必填】完整不遮蔽\n1.來源資料供系統比對運用\n2.系統資料查詢採半遮蔽\n3.可輸入英文、羅馬拼音、小數點\n4.原住民特殊符號',
    },
    {
      id: 3,
      chineseField: '身分證字號',
      englishField: 'pid',
      dataType: '基本資料',
      type: 'nvarchar',
      length: 20,
      remark:
        '【必填】完整不遮蔽\n1.來源資料供系統比對運用\n2.系統資料查詢採半遮蔽\n3.僅可輸入國人身分證字號及外僑統一證號',
    },
    {
      id: 4,
      chineseField: '單位',
      englishField: 'unit',
      dataType: '基本資料',
      type: 'nvarchar',
      length: 50,
      remark: '',
    },
    {
      id: 5,
      chineseField: '軍種',
      englishField: 'military_type',
      dataType: '基本資料',
      type: 'nvarchar',
      length: 50,
      remark: '',
    },
    {
      id: 6,
      chineseField: '階級',
      englishField: 'military_class',
      dataType: '基本資料',
      type: 'nvarchar',
      length: 50,
      remark: '',
    },
    {
      id: 7,
      chineseField: '新增人員',
      englishField: 'cre_user',
      dataType: '',
      type: 'nvarchar',
      length: 30,
      remark: '編管機關毋須填寫',
    },
    {
      id: 8,
      chineseField: '新增日期',
      englishField: 'cre_date',
      dataType: '',
      type: 'datetime',
      length: '',
      remark: '編管機關毋須填寫',
    },
    {
      id: 9,
      chineseField: '修改人員',
      englishField: 'update_user',
      dataType: '',
      type: 'nvarchar',
      length: 30,
      remark: '編管機關毋須填寫',
    },
    {
      id: 10,
      chineseField: '修改日期',
      englishField: 'update_date',
      dataType: '',
      type: 'datetime',
      length: '',
      remark: '編管機關毋須填寫',
    },
    {
      id: 11,
      chineseField: '傳輸人員',
      englishField: 'upload_user',
      dataType: '',
      type: 'nvarchar',
      length: 30,
      remark: '編管機關毋須填寫',
    },
    {
      id: 12,
      chineseField: '傳輸日期',
      englishField: 'upload_date',
      dataType: '',
      type: 'datetime',
      length: '',
      remark: '編管機關毋須填寫',
    },
    {
      id: 13,
      chineseField: '資料狀態',
      englishField: 'data_status',
      dataType: '',
      type: 'nvarchar',
      length: 10,
      remark: '編管機關毋須填寫\n1.暫存狀態\n2.正式狀態\n3.已傳送',
    },
    {
      id: 14,
      chineseField: '審認狀態',
      englishField: 'approval_status',
      dataType: '',
      type: 'nvarchar',
      length: 10,
      remark: '編管機關毋須填寫\n1.已審認\n2.未審認',
    },
    {
      id: 15,
      chineseField: '審認人員',
      englishField: 'approval_user',
      dataType: '',
      type: 'nvarchar',
      length: 30,
      remark: '編管機關毋須填寫',
    },
    {
      id: 16,
      chineseField: '審認日期',
      englishField: 'approval_date',
      dataType: '',
      type: 'datetime',
      length: '',
      remark: '編管機關毋須填寫',
    },
  ],
});

export default hrMilitaryMedicalmanConfig;
