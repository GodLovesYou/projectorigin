import moment from 'moment'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  }
  // else {
  //   time = +time
  // }
  const d = new Date(time)
  // const now = Date.now()

  // const diff = (now - d) / 1000

  // if (diff < 30) {
  //   return '刚刚'
  // } else if (diff < 3600) {
  //   // less 1 hour
  //   return Math.ceil(diff / 60) + '分钟前'
  // } else if (diff < 3600 * 24) {
  //   return Math.ceil(diff / 3600) + '小时前'
  // } else if (diff < 3600 * 24 * 2) {
  //   return '1天前'
  // }
  // if (option) {
  //   return parseTime(time, option)
  // } else {
  //   return (
  //     d.getMonth() +
  //     1 +
  //     '月' +
  //     d.getDate() +
  //     '日' +
  //     d.getHours() +
  //     '时' +
  //     d.getMinutes() +
  //     '分'
  //   )
  // }
  return (
    d.getFullYear() + 
    '-'+ 
    (d.getMonth() +
    1) +
    '-' +
    d.getDate() +
    ' ' +
    d.getHours() +
    ':' +
    d.getMinutes() +
    ':' +
    d.getSeconds()
  )
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export function handledErr(err) {
  return !!((err && !err.success) || (err && err.message))
}

export function formatDate(time) {
  if(!time){
    return ''
  }
  time = new Date(time)
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  // var hour = time.getHours();
  // var minute = time.getMinutes();
  // var second = time.getSeconds();
  // return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  return year + "-" + month + "-" + date;
} 

export function yearVisibleChange(val, years, form) {
  if (val) {
    if (years.length !== 0) {
      const thisYear = moment().year();
      const thisYearDic = years.find(
        year => year.name === "" + thisYear
      );
      form.year = (thisYearDic && thisYearDic.value) || "";
    }
  }
}
export function trimSpace(obj) {
  for(let key in obj){
    if(typeof obj[key] === 'string'){
      obj[key] = obj[key].trim()
    }
  }
  return obj
}