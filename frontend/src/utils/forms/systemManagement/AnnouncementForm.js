import BaseForm from '../BaseForm';
const maxYear = new Date().getFullYear() + 3;
class AnnouncementForm extends BaseForm {
  initialValue = (values) => ({
    title: values.title || '',
    isPinned: values.isPinned || false,
    announcementBeganAt: values.announcementBeganAt || '',
    announcementEndedAt: values.announcementEndedAt || '',
    content: values.content || '',
    file: values.file || [],
  });

  validationSchema = () =>
    this.Yup.object().shape({
      title: this.Yup.string()
        .required('主旨必填！')
        .max(100, '主旨至多100個字！'),
      content: this.Yup.string()
        .required('內容必填！')
        .max(4000, '內容至多4000個字！'),
      announcementBeganAt: this.Yup.date().required('公告開始日期必填！'),
      announcementEndedAt: this.Yup.date().required('公告結束日期必填！'),
      isPinned: this.Yup.bool().required('置頂必填！'),
      file: this.Yup.array().nullable(),
    });
}

const announcementForm = new AnnouncementForm();

export default announcementForm;
