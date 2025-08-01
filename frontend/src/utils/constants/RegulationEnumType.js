export const GENERAL = 1;
export const CIVIL = 2;
export const SPIRITUAL = 3;
export const HUMAN_RESOURCE = 4;
export const SUPPLY_RESOURCE = 5;
export const FINANCE = 6;
export const TRANSPORTATION = 7;
export const HEALTH = 8;
export const TECHNOLOGY = 9;
export const MILITARY = 10;
export const DISASTER = 11;

const regulationEnumType = [
  { text: '通用及國防組織類', value: GENERAL },
  { text: '全民防衛動員類', value: CIVIL },
  { text: '精神動員類', value: SPIRITUAL },
  { text: '人力動員類', value: HUMAN_RESOURCE },
  { text: '物資經濟動員類', value: SUPPLY_RESOURCE },
  { text: '財力動員類', value: FINANCE },
  { text: '交通動員類', value: TRANSPORTATION },
  { text: '衛生動員類', value: HEALTH },
  { text: '科技動員類', value: TECHNOLOGY },
  { text: '軍事動員類', value: MILITARY },
  { text: '災害防救及其他類', value: DISASTER },
];

export default regulationEnumType;
