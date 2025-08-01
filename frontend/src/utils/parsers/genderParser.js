const genderParser = (gender) => {
  if (gender === 1 || gender === 8) return '男性';
  if (gender === 2 || gender === 9) return '女性';
  return '';
};

export default genderParser;
