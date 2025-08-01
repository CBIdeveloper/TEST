import ModalHelper from '../../helper/ModalHelper';

const responseFilter = (response) => {
  if (response.data.error === undefined) return response;
  ModalHelper.openErrorModal({ message: response.data.error.message });
  throw response.data.error;
};

export default responseFilter;
