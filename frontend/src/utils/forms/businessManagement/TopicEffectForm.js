import BaseForm from '../BaseForm';

class TopicEffectForm extends BaseForm {
  initialValue = (values) => ({
    topicList: values.topicList || [],
  });

  // validationSchema = () =>
  //   this.Yup.object().shape({
  //   });
}

const topicEffectForm = new TopicEffectForm();

export default topicEffectForm;
