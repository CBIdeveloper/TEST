import BaseForm from './BaseForm';

import FormikHelper from '../helper/FormikHelper';
import { values } from 'regenerator-runtime';

class RegisterForm extends BaseForm {
  constructor(props) {
    super(props);
    this.template = {
      mobilizationPlanId: '',
      mobilizationClassificationId: '',
      braidingCategoryIdList: [],
    };
    this.template2 = {
      mobilizationPlanId: 5,
      mobilizationClassificationId: '',
      braidingCategoryIdList: [],
    };
    this.state = {
      braidingCategoryIdList: [],
    };
  }

  initialValue = (values) => ({
    isUpdate: values.isUpdate || false,
    account: values.account || '',
    accountVerification: values.accountVerification || '',

    name: values.name || '',
    jobPosition: values.jobPosition || '',
    pid: values.pid || '',
    email: values.email || '',
    businessPhone: values.businessPhone || '',
    telephoneExtension: values.telephoneExtension || '',
    cellphone: values.cellphone || '',
    lineId: values.lineId || '',
    agencyType: values.agencyType || '1',
    firstlevelAgencyId: values.firstlevelAgencyId || '',
    secondaryAgencyId: values.secondaryAgencyId || '',
    department: values.department || '',
    maintainManufacturer: values.maintainManufacturer || '',
    isPlansponsor: values.isPlansponsor || false,
    cityId: values.cityId || null,
    firstlevelUnitId: values.firstlevelUnitId || null,
    unitName: values.unitName || null,
    businessPlan: values.businessPlan || '',
    businessNeeds: values.businessNeeds || '',
    appliedIpAddress: values.appliedIpAddress || '',
    mobilizationType: values.mobilizationType || '',
    mobilizationPlanList: values.mobilizationPlanList || [this.template],
    mobilizationPlanId: values.mobilizationPlanId || '',
    remark: values.remark || '',
    pamacc: values.pamacc || '',
    ztacc: values.ztacc || '',
    splacc: values.splacc || '',
    toacc: values.toacc || '',

    roleMainId: values.roleMainId || '',

    file: values.file || '',

    state: values.state || '1',
    firstlevelUnitId: values.firstlevelUnitId || '',
    levelId: values.levelId || '',
    militaryAgencyId: values.militaryAgencyId || '',
    militaryagencyId: values.militaryagencyId || '',
    militaryAgencyId: values.militaryAgencyId || values.militaryagencyId,
    secondlevelMilitaryagency: values.secondlevelMilitaryagency || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      // account: this.Yup.string()
      //   .min(8, '帳號至少需要8個字！')
      //   .max(20, '帳號長度至多20個字！')
      //   .required('帳號必填！'),
      accountVerification: this.Yup.string()
        .nullable()
        .when('isUpdate', {
          is: false,
          then: this.Yup.string()
            .required('密碼必填!')
            .min(8, '密碼至少需要8個字！')
            .max(20, '密碼長度至多20個字！')
            .test('Invalid password', '密碼格式錯誤！', (email) =>
              FormikHelper.passwordValidation(email),
            ),
        }),
      name: this.Yup.string().required('姓名必填!').max(30, '姓名至多30個字！'),
      jobPosition: this.Yup.string()
        .required('職稱必填!')
        .max(30, '職稱至多30個字！'),
      pid: this.Yup.string()
        .required('身分證字號必填!')
        .max(10, '身分證字號至多10個字！')
        .test('Invalid identity number', '身分證字號格式錯誤！', (id) =>
          FormikHelper.identityNumberValidation(id),
        ),
      email: this.Yup.string()
        .required('電子信箱必填!')
        .max(100, '電子信箱至多100個字！')
        .test('Invalid email', '電子郵件信箱格式錯誤！', (email) =>
          FormikHelper.emailValidation(email),
        ),
      businessPhone: this.Yup.string()
        .required('公務電話必填!')
        .max(15, '公務電話至多15個字！'),
      telephoneExtension: this.Yup.string()
        .nullable()
        .max(10, '公務電話分機至多10個字！'),
      cellphone: this.Yup.string().nullable().max(10, '手機號碼至多10個字！'),
      lineId: this.Yup.string().nullable().max(50, 'Line Id至多50個字！'),
      agencyType: this.Yup.string().required('單位類型必填!'),
      firstlevelAgencyId: this.Yup.string()
        .nullable()
        .when('agencyType', {
          is: '1',
          then: this.Yup.string().required('二級機關必填!'),
        }),
      secondaryAgencyId: this.Yup.string().nullable(),
      department: this.Yup.string().nullable().max(30, '業務單位至多30個字！'),
      maintainManufacturer: this.Yup.string().when('agencyType', {
        is: '3',
        then: this.Yup.string()
          .required('維護廠商必填!')
          .max(30, '維護廠商至多30個字！'),
      }),
      isPlansponsor: this.Yup.bool().required('是否為計畫承辦人必填!'),
      cityId: this.Yup.string()
        .nullable()
        .when('agencyType', {
          is: '2',
          then: this.Yup.string().required('縣市必填!'),
        }),
      firstlevelUnitId: this.Yup.string()
        .nullable()
        .when('agencyType', {
          is: '2',
          then: this.Yup.string().required('一級單位必填!'),
        }),
      levelId: this.Yup.string()
        .nullable()
        .when('agencyType', {
          is: '4',
          then: this.Yup.string().required('層級必填!'),
        }),
      militaryAgencyId: this.Yup.string()
        .nullable()
        .when('agencyType', {
          is: '4',
          then: this.Yup.string().required('機關必填!'),
        }),
      unitName: this.Yup.string().nullable().max(50, '機關名稱至多50個字！'),
      businessPlan: this.Yup.string().required('業務計畫別必填!'),
      businessNeeds: this.Yup.string()
        .required('業務需求說明必填!')
        .max(4000, '業務需求說明至多4000個字！'),
      appliedIpAddress: this.Yup.string()
        .required('登入IP位址必填!')
        .max(30, '登入IP位址至多30個字！')
        .test('Invalid ip address', '登入IP位址格式錯誤！', (ipAddress) =>
          FormikHelper.ipAddressValidation(ipAddress),
        ),

      mobilizationType: this.Yup.string()
        .nullable()
        .transform((value) =>
          value === undefined || value === null ? '' : value,
        )
        .when(['businessPlan', 'agencyType'], {
          is: (businessPlan, agencyType) => {
            return businessPlan === '1' && agencyType === '1';
          },
          then: this.Yup.string().required('動員類型必填！'),
        }),

      mobilizationPlanId: this.Yup.number().when(
        ['businessPlan', 'agencyType'],
        {
          is: (businessPlan, agencyType) =>
            businessPlan === '2' && agencyType === '1',
          then: this.Yup.number().required('動員方案必填！'),
        },
      ),

      mobilizationPlanList: this.Yup.array().when(
        ['businessPlan', 'agencyType', 'isPlansponsor'],
        {
          is: (businessPlan, agencyType, isPlansponsor) =>
            businessPlan === '2' && agencyType === '1',
          then: this.Yup.array().when('businessPlan', {
            is: (businessPlan) => businessPlan === '2',
            then: this.Yup.array().of(
              this.Yup.object().shape({
                mobilizationClassificationId: this.Yup.string().when(
                  'mobilizationPlanId',
                  {
                    is: (mobilizationPlanId) =>
                      mobilizationPlanId !== undefined,
                    then: this.Yup.string().required('動員分類必填！'),
                  },
                ),
                braidingCategoryIdList: this.Yup.array().nullable(),
              }),
            ),
            otherwise: this.Yup.array().of(
              this.Yup.object().shape({
                mobilizationPlanId:
                  this.Yup.string().required('動員方案必填！'),
                mobilizationClassificationId:
                  this.Yup.string().required('動員分類必填！'),
                braidingCategoryIdList: this.Yup.array().nullable(),
              }),
            ),
          }),
          otherwise: this.Yup.array().of(
            this.Yup.object().shape({
              mobilizationPlanId: this.Yup.string().nullable(),
              mobilizationClassificationId: this.Yup.string().nullable(),
              braidingCategoryIdList: this.Yup.array().nullable(),
            }),
          ),
        },
      ),
      remark: this.Yup.string().nullable(),

      ztacc: this.Yup.string().when('isUpdate', {
        is: true,
        then: this.Yup.string().max(100, '零信任帳號長度至多100個字！'),
      }),

      pamacc: this.Yup.string().when('isUpdate', {
        is: true,
        then: this.Yup.string().max(100, '特權帳號長度至多100個字！'),
      }),

      splacc: this.Yup.string().when('isUpdate', {
        is: true,
        then: this.Yup.string().max(100, '日誌管理帳號長度至多100個字！'),
      }),

      toacc: this.Yup.string().when('isUpdate', {
        is: true,
        then: this.Yup.string().max(100, '防竄改帳號長度至多100個字！'),
      }),

      roleMainId: this.Yup.string().required('角色權限必填！'),

      file: this.Yup.string()
        .nullable()
        .when('isUpdate', {
          is: false,
          then: this.Yup.string().required('申請附件必填!'),
        }),

      state: this.Yup.string().required('啟用狀態必填！'),
    });
}

const loginForm = new RegisterForm();

export default loginForm;
