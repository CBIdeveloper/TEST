import BaseForm from '../BaseForm';

class PermissionApplicationForm extends BaseForm {
    constructor(props) {
        super(props);
    }

    initialValue = (values) => ({
        useStartDate: values.useStartDate || '',
        useEndDate:values.useEndDate || '',
        requirements:values.requirements || ''
    });

    validationSchema = () =>
        this.Yup.object().shape({
            useStartDate: this.Yup.date().required("使用開始日期必填"),
            useEndDate: this.Yup.date().required("使用結束日期必填"),
            requirements: this.Yup.string().required("需求說明必填").max(2000, "申請需求說明至多200個字")
        });
}

const permissionApplicationForm = new PermissionApplicationForm();

export default permissionApplicationForm;
