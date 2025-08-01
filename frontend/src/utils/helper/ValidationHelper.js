const baseColor = ['#0000ff', '#CE0000', '#7E3D76', '#46A3FF']; // 底色
const sColor = ['#B22222', '#F9F900', '#82D900', '#FFAF60']; // 干擾點顏色
const fColor = ['#FFA07A', '#00BB00', '#EAC100', '#F75000']; // 文字顏色

/* 生成6位隨機數 */
const rand = () => {
  let validate = '';
  const str =
    '123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789';
  const arr = str.split('');
  let ranNum;
  for (let i = 0; i < 4; i += 1) {
    ranNum = Math.floor(Math.random() * 66); // 隨機數在[0,65]之間
    validate += arr[ranNum];
  }
  return validate;
};

/* 生成隨機顏色組合序號 */
const randColor = () => Math.floor(Math.random() * baseColor.length);

/* 干擾線的隨機x坐標值 */
const lineX = () => Math.floor(Math.random() * 150);

/* 干擾線的隨機y坐標值 */
const lineY = () => Math.floor(Math.random() * 40);

const draw = (context, setRandomWord) => {
  const color = randColor();
  context.beginPath();
  context.fillStyle = baseColor[color];
  context.fillRect(0, 0, 150, 40); // (x,y,width,height)

  for (let j = 0; j < 40; j += 1) {
    context.beginPath();
    context.fillStyle = sColor[color];
    const arcSize = (Math.floor(Math.random() * (50 - 5 + 1)) + 5) / 10;
    context.arc(lineX(), lineY(), arcSize, 0, 2 * Math.PI);
    context.fill();
  }
  context.fillStyle = fColor[color];
  context.font = 'bold 25px Verdana';
  const randomWord = rand();
  setRandomWord(randomWord);
  context.fillText(randomWord, 10, 30); // 把rand()生成的隨機數文本填充到canvas中
};

export default {
  draw,
};
