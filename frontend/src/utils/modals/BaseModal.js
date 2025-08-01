import store from '../../store/store';

/**
 * Represents a modal.
 * @class
 */
class BaseModal {
  constructor() {
    this.language = store.getState().language.languageInfo.languageObject.modal;
  }

  /**
   * Closes the modal.
   * @function
   */
  onClose = () => {};

  /**
   * Gets the title of the modal.
   * @function
   * @return {string} -  the title of the modal
   */
  getModalTitle = () => '';

  /**
   * Gets the content of the modal.
   * @function
   * @return {ReactElement | string} -  the content of the modal
   */
  getModalContent = () => '';

  /**
   * Gets the classname of the modal's header.
   * @function
   * @return {string} -  the classname of the modal header
   */
  getHeaderClassname = () => '';

  getModalEnd = () => '';
}

export default BaseModal;
