import BaseForm from '../BaseForm';
import DateHelper from "../../helper/DateHelper";

class PermissionApproveForm extends BaseForm {
    constructor(props) {
        super(props);
    }

    initialValue = (values) => ({
        useStartDate: DateHelper.momentDate(values.useStartDate) || null,
        useEndDate: DateHelper.momentDate(values.useEndDate) || null,
        auditOpinion: values.auditOpinion || '',
        isReject: values.isReject || false
    });

    validationSchema = () =>
        this.Yup.object().shape({
            useStartDate: this.Yup.date().required("使用開始日期必填"),
            useEndDate: this.Yup.date().required("使用結束日期必填"),
            auditOpinion: this.Yup.string().nullable()
                .when('isReject', {
                    is: true,
                    then: this.Yup.string()
                        .required("審核不同意時，請填寫審核意見")
                        .max(100, '審核意見長度至多2000個字！')
                })
        });
}

const permissionApproveForm = new PermissionApproveForm();

export default permissionApproveForm;
