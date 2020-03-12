const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function floatAdd(arg1, arg2) {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

function floatSub(arg1, arg2) {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return (arg1 * m - arg2 * m) / m;
}


function floatMul(arg1, arg2) {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
}


function floatDiv(arg1, arg2) {
  let t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {}

  r1 = Number(arg1.toString().replace('.', ''));

  r2 = Number(arg2.toString().replace('.', ''));

  return this.floatMul(r1 / r2, Math.pow(10, t2 - t1));
}


//自定义加法运算
function addNum(num1, num2) {
  var val = Number(num1) + Number(num2);
  if (!isNaN(parseFloat(val))) {
    val = val.toFixed(2);
  }
  return val;
}

//自定义减法运算
function decNum(num1, num2) {
  var val = Number(num1) - Number(num2);
  if (!isNaN(parseFloat(val))) {
    val = val.toFixed(2);
  }
  return val;
}

//自定义乘法运算
function mulNum(num1, num2) {
  var val = Number(num1) * Number(num2);
  if (!isNaN(parseFloat(val))) {
    val = val.toFixed(2);
  }
  return val;
}

module.exports = {
  formatTime,
  floatAdd,
  floatSub,
  floatMul,
  floatDiv,
  addNum,
  decNum,
  mulNum

}