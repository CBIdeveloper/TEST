import IdentityNumberHelper from './IdentityNumberHelper';

const notUnicodeMatch = (name) => [
  /^[a-zA-Z0-9]+/,
  {
    message: `${name}只能輸入英文與數字！`,
    excludeEmptyString: true,
  },
];

const handleEnterKeyUp = (event, callback) => {
  const focusOnElement = (form, inputs, index) => {
    if (inputs.length > index) {
      inputs[index].focus();
    }
  };

  if (event.key === 'Enter') {
    const form = document.getElementsByTagName('form')[0];
    if (form !== undefined) {
      const inputs = [...form].filter(
        (item) => !item.readOnly && item.type !== 'file',
      );
      const index = inputs.indexOf(event.target);
      if (index !== -1) {
        event.preventDefault();
        if (callback) callback();
        focusOnElement(form, inputs, index + 1);
      }
    }
  }
};

const identityNumberValidation = (id) =>
  /^[A-Z](1|2)\d{8}$/i.test(id) && IdentityNumberHelper.idNumberCheck(id);

const emailValidation = (email) => {
  if (email !== undefined && email !== null) {
    // const [username, domain] = email.split('@');
    // if (username.length < 6 || username.length > 30) {
    //   return false;
    // }
    const emailPattern = /^(?!\.)(?!.*\.\.)(?!.*\.$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;
    return emailPattern.test(email);
  }
  return true;
};

const englishValidation = (name) => {
  if (name !== undefined) {
    return /^[a-zA-Z][a-zA-Z '-.‘’]+$/i.test(name);
  }
  return true;
};

const addressValidation = (address) => {
  if (address !== undefined) {
    const splitAddressList = address.split('|');
    return splitAddressList[0] !== '';
  }
  return true;
};

const passwordValidation = (password) => {
  if (password !== undefined) {
    return (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) ||
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,.\/:;<=>?@\[\]\^_`{|}~\\\\-])[A-Za-z!"#$%&'()*+,.\/:;<=>?@\[\]\^_`{|}~\\\\-]{8,}$/.test(password) ||
      /^(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,.\/:;<=>?@\[\]\^_`{|}~\\\\-])[a-z\d!"#$%&'()*+,.\/:;<=>?@\[\]\^_`{|}~\\\\-]{8,}$/.test(password) ||
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,.\/:;<=>?@\[\]\^_`{|}~\\\\-])[A-Z\d!"#$%&'()*+,.\/:;<=>?@\[\]\^_`{|}~\\\\-]{8,}$/.test(password) ||
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,.\/:;<=>?@\[\]\^_`{|}~\\\\-])[a-zA-Z\d!"#$%&'()*+,.\/:;<=>?@\[\]\^_`{|}~\\\\-]{8,}$/.test(password)
    );
  }
  return true;
};

const ipAddressValidation = (ipAddress) => {
  if (ipAddress !== undefined) {
    return /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
      ipAddress,
    );
  }
  return true;
};

const enCodeValidation = (enCode) => {
  if (enCode !== undefined) {
    return /^[A-Z]+$/.test(enCode);
  }
  return true;
};

export default {
  notUnicodeMatch,
  handleEnterKeyUp,
  identityNumberValidation,
  emailValidation,
  englishValidation,
  addressValidation,
  passwordValidation,
  ipAddressValidation,
  enCodeValidation,
};
