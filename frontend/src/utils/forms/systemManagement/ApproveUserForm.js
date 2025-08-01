import BaseForm from '../BaseForm';

class ApproveUserForm extends BaseForm {
  constructor(props) {
    super(props);
    this.template = {
      mobilizationPlanId: '',
      mobilizationClassificationId: '',
      braidingCategoryIdList: [],
    };
  }

  initialValue = (values) => ({
    isUpdate: values.isUpdate || false,
    account: values.account || '',
    password: values.password || '',

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
    isPlansponsor: values.isPlansponsor || false,
    cityId: values.cityId || null,
    firstlevelUnitId: values.firstlevelUnitId || null,
    unitName: values.unitName || null,
    businessPlan: values.businessPlan || '',
    businessNeeds: values.businessNeeds || '',
    appliedIpAddress: values.appliedIpAddress || '',
    roleMainId: values.roleMainId || '',

    mobilizationPlan: values.mobilizationPlan || '',
    mobilizationPlanList: values.mobilizationPlanList || [this.template],

    reasonOfFailure: values.reasonOfFailure || '',
  });

  validationSchema = () =>
    this.Yup.object().shape({
      account: this.Yup.string().nullable(),
      password: this.Yup.string().nullable(),
      name: this.Yup.string().nullable(),
      jobPosition: this.Yup.string().nullable(),
      pid: this.Yup.string().nullable(),
      email: this.Yup.string().nullable(),
      businessPhone: this.Yup.string().nullable(),
      telephoneExtension: this.Yup.string().nullable(),
      cellphone: this.Yup.string().nullable(),
      lineId: this.Yup.string().nullable(),
      agencyType: this.Yup.string().nullable(),
      firstlevelAgencyId: this.Yup.string().nullable(),
      secondaryAgencyId: this.Yup.string().nullable(),
      department: this.Yup.string().nullable(),
      isPlansponsor: this.Yup.bool().nullable(),
      cityId: this.Yup.string().nullable(),
      firstlevelUnitId: this.Yup.string().nullable(),
      unitName: this.Yup.string().nullable(),
      businessPlan: this.Yup.string().nullable(),
      businessNeeds: this.Yup.string().nullable(),
      appliedIpAddress: this.Yup.string().nullable(),

      roleMainId: this.Yup.string().nullable(),

      mobilizationPlan: this.Yup.string().nullable(),
      mobilizationPlanList: this.Yup.array().of(
        this.Yup.object().shape({
          mobilizationPlanId: this.Yup.string().nullable(),
          mobilizationClassificationId: this.Yup.string().nullable(),
          braidingCategoryIdList: this.Yup.array().nullable(),
        }),
      ),
    });
}

const approveUserForm = new ApproveUserForm();

export default approveUserForm;
