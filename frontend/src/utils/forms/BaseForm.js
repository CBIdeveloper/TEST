import * as Yup from 'yup';
import { getIn } from 'formik';

/**
 * Represents a form.
 * @class
 */
class BaseForm {
  constructor() {
    this.Yup = Yup;
  }

  /**
   * Gets the initial value of the form.
   * @return {Object} - the initial value of the form
   */
  initialValue = () => ({});

  /**
   * Gets the validation schema of the form.
   * @return {Object} - the validation schema of the form
   */
  validationSchema = () => this.Yup.object().shape({});

  /**
   * Gets the requirement information of the field.
   * @param {String} filedName - the name of the field
   * @return {Boolean} - the requirement of the field
   */
  isFieldRequired = (filedName) => {
    const { fields } = this.validationSchema().describe();
    const keys = Object.keys(fields);
    let innerFields = {};
    keys.forEach((key) => {
      const { innerType } = fields[key];
      if (innerType !== undefined) {
        innerFields = { ...innerFields, ...innerType.fields };
      }
    });
    return !!getIn(
      {
        ...fields,
        ...innerFields,
      },
      filedName,
    ).tests.find((test) => test.name === 'required');
  };
}

export default BaseForm;
