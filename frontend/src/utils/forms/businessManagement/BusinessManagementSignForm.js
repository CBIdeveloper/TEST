import BaseForm from '../BaseForm';

class BusinessManagementSignForm extends BaseForm {
  initialValue = (values) => ({
    isFood: values.isFood || false,
    isPlace: values.isPlace || false,
    isTraffic: values.isTraffic || false,
    signList: values.signList || [],
  });

  validationSchema = () =>
    this.Yup.object().shape({
      // isFood: this.Yup.bool().required('isFood is required'),
      // isPlace: this.Yup.bool().required('isPlace is required'),
      // isTraffic: this.Yup.bool().required('isTraffic is required'),
      signList: this.Yup.array().of(
        this.Yup.object().shape({
          unit: this.Yup.string().required('報名單位必填！'),
          jobPosition: this.Yup.string().required('職稱必填！'),
          name: this.Yup.string().required('與會人員姓名必填！'),
          telephone: this.Yup.string().required('聯絡電話必填！'),
          isFood: this.Yup.bool()
            .nullable()
            .when('$.isFood', {
              is: true,
              then: this.Yup.bool().nullable().required('是否用餐為必填！'),
              otherwise: this.Yup.bool().nullable(),
            }),
          foodType: this.Yup.string()
            .nullable()
            .when(['$.isFood', 'isFood'], {
              is: (hasFood, isFood) => hasFood && isFood,
              then: this.Yup.string().nullable().required('食物類型為必填！'),
              otherwise: this.Yup.string().nullable(),
            }),
          isPlace: this.Yup.bool()
            .nullable()
            .when('$.isPlace', {
              is: true,
              then: this.Yup.bool().nullable().required('留宿為必填！'),
              otherwise: this.Yup.bool().nullable(),
            }),
          trafficType: this.Yup.string()
            .nullable()
            .when('$.isTraffic', {
              is: true,
              then: this.Yup.string().nullable().required('交通方式為必填！'),
              otherwise: this.Yup.string().nullable(),
            }),
          licensePlate: this.Yup.string()
            .nullable()
            .when(['$.isTraffic', 'trafficType'], {
              is: (hasTraffic, trafficType) => hasTraffic && trafficType === '2',
              then: this.Yup.string().nullable().required('車牌號碼為必填！'),
              otherwise: this.Yup.string().nullable(),
            }),
        })
      ).min(1, "至少有一位報名資訊"), // 確保至少有一個項目
    });
}

const businessManagementSignForm = new BusinessManagementSignForm();

export default businessManagementSignForm;
