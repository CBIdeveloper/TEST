export const IMPORTANT_POLICY = 1;
export const CROSS_DEPARTMENT_MEETING = 2;
export const MOBILIZATION_STRATEGY = 3;
export const MOBILIZATION_CATEGORIZATION = 4;
export const MOBILIZATION_ACCESS = 5;
export const MOBILIZATION_EVALUATION = 6;
export const MOBILIZATION_VALIDATION = 7;
export const MOBILIZATION_LECTURE = 8;
export const EXCELLENCE_RECOGNITION = 9;
export const MOBILIZATION_REPORT = 10;
export const MID_WAR_REPORT = 11;

const businessManagementType = [
  { text: '重要政策', value: IMPORTANT_POLICY },
  { text: '跨部會定期會議', value: CROSS_DEPARTMENT_MEETING },
  { text: '動員方案審議', value: MOBILIZATION_STRATEGY },
  { text: '動員分類計畫審議', value: MOBILIZATION_CATEGORIZATION },
  { text: '動員業務訪問', value: MOBILIZATION_ACCESS },
  { text: '動員業務訪評', value: MOBILIZATION_EVALUATION },
  { text: '演習驗證評鑑', value: MOBILIZATION_VALIDATION },
  { text: '動員講習培訓', value: MOBILIZATION_LECTURE },
  { text: '動員績優表揚', value: EXCELLENCE_RECOGNITION },
  { text: '動員會報', value: MOBILIZATION_REPORT },
  { text: '戰綜會報', value: MID_WAR_REPORT },
];

export default businessManagementType;
