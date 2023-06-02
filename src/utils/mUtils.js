import { isArray,isString } from "@/utils/is"
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string')
  {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  var value = window.localStorage.getItem(name)
  if (value !== null)
  {
    try
    {
      value = JSON.parse(value)
    } catch (e)
    {
      value = value
    }
  }
  return value
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 让整数自动保留2位小数
 */
// export const returnFloat = value => {
//     var value=Math.round(parseFloat(value)*100)/100;
//     var xsd=value.toString().split(".");
//     if(xsd.length==1){
//         value=value.toString()+".00";
//         return value;
//     }
//     if(xsd.length>1){
//         if(xsd[1].length<2){
//             value=value.toString()+"0";
//         }
//         return value;
//     }
// }
/**
 * @param {date} 标准时间格式:Fri Nov 17 2017 09:26:23 GMT+0800 (中国标准时间)
 * @param {type} 类型
 *   type == 1 ---> "yyyy-mm-dd hh:MM:ss.fff"
 *   type == 2 ---> "yyyymmddhhMMss"
 *   type == '' ---> "yyyy-mm-dd hh:MM:ss"
 */
export const formatDate = (date, type) => {
  if (typeof date === 'number') date = new Date(date)
  var year = date.getFullYear()// 年
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1// 月
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()// 日
  var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()// 时
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()// 分
  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()// 秒
  var milliseconds = date.getMilliseconds() < 10 ? '0' + date.getMilliseconds() : date.getMilliseconds() // 毫秒
  if (type == 1)
  {
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds + '.' + milliseconds
  } else if (type == 2)
  {
    return year + '' + month + '' + day + '' + hour + '' + minutes + '' + seconds
  } else if (type == 3)
  {
    return year + '-' + month + '-' + day
  } else
  {
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  }
}
/**
 * 时间转换：20150101010101 --> '2015-01-01 01:01:01'
 */
export const parseToDate = (timeValue) => {
  var result = ''
  var year = timeValue.substr(0, 4)
  var month = timeValue.substr(4, 2)
  var date = timeValue.substr(6, 2)
  var hour = timeValue.substr(8, 2)
  var minute = timeValue.substr(10, 2)
  var second = timeValue.substr(12, 2)
  result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  return result
}
/**
 * 判断空值
 */
export const isEmpty = (keys) => {
  if (typeof keys === 'string')
  {
    keys = keys.replace(/\"|&nbsp;|\\/g, '').replace(/(^\s*)|(\s*$)/g, '')
    if (keys == '' || keys == null || keys == 'null' || keys === 'undefined')
    {
      return true
    } else
    {
      return false
    }
  } else if (typeof keys === 'undefined')
  { // 未定义
    return true
  } else if (typeof keys === 'number')
  {
    return false
  } else if (typeof keys === 'boolean')
  {
    return false
  } else if (typeof keys === 'object')
  {
    if (JSON.stringify(keys) == '{}')
    {
      return true
    } else if (keys == null)
    { // null
      return true
    } else
    {
      return false
    }
  }

  if (keys instanceof Array && keys.length == 0)
  { // 数组
    return true
  }
}

/**
 * 返回两位的小数的字符串
 */
export const toFixedNum = (num) => {
  const tonum = Number(num).toFixed(2)
  return tonum
}

export const showMessage = () => {
  this.$message({
    showClose: true,
    message: '对不起，您暂无此操作权限~',
    type: 'success'
  })
}

/**
 * 读取base64
 */
export const readFile = file => {
  console.log(file)
  // var file = this.files[0];
  // 判断是否是图片类型
  if (!/image\/\w+/.test(file.raw.type))
  {
    alert('只能选择图片')
    return false
  }
  var reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function (e) {
    var filedata = {
      filename: file.name,
      filebase64: e.target.result
    }
    alert(e.target.result)
  }
}

/**
 * 动态插入css
 */
export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
/**
   * 设置浏览器头部标题
   */
export const setTitle = (title) => {
  title = title ? `${title}` : '智能雾灯后台管理系统'
  window.document.title = title
}

export const param2Obj = url => {
  const search = url.split('?')[1]
  if (!search)
  {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

// 是否为正整数
export const isInteger = (s) => {
  var re = /^[0-9]+$/
  return re.test(s)
}

export const setContentHeight = (that, ele, height) => {
  that.$nextTick(() => {
    ele.style.height = (document.body.clientHeight - height) + 'px'
  })
}

/**
 *  字符串的首字符如果是 c，则删除
 */
export const delFirstChar = (str, c) => {
  if (!str) return ''
  if (str.charAt(0) === c)
  {
    str = str.substring(1)
  }
  return str
}

export const formatForm = (model = {}) => {

  for (const k in model)
  {
    if (!model[k] || model[k] == '')
    {
      delete (model[k])
    }
  }
  return model
}

export const filterTime = (val) => {
  if (val)
  {
    return val.substr(0, val.lastIndexOf(':'))
  } else
  {
    return val
  }
}
export const array2Tree = (data, pid) => {

  let res = [];
  data.forEach(item => {
    if (item.Pid === pid)
    {
      let itemChildren = array2Tree(data, item.Pcode);
      if (itemChildren.length) item.children = itemChildren;
      res.push(item);
    }
  });
  return res;
}


export function treearr (arr, pid = '0', res = []) {
  arr.forEach(item => {
    res.push({ pid: pid, id: item.value, pname: item.label });
    if (item.children && item.children.length !== 0)
    {
      treearr(item.children, item.value, res);
    }
  })
  return res
}

// 16进制转10进制并且补0
export const hexToDec = (hex) => {
  var dec = 0
  var hexArr = hex.split('')
  var len = hexArr.length
  hexArr.forEach(function (item, index) {
    var num = parseInt(item, 16)
    var pos = len - index - 1
    dec += num * Math.pow(16, pos)
  })
  return dec.toString().padStart(8, '0')
}
// 获取当前时间
export const getNowFormatDate = () => {
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var strHour = date.getHours()
  var strMin = date.getMinutes()
  var strSec = date.getSeconds()
  if (month >= 1 && month <= 9)
  {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9)
  {
    strDate = '0' + strDate
  }
  if (strHour >= 0 && strHour <= 9)
  {
    strHour = '0' + strHour
  }
  if (strMin >= 0 && strMin <= 9)
  {
    strMin = '0' + strMin
  }
  if (strSec >= 0 && strSec <= 9)
  {
    strSec = '0' + strSec
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
  return currentdate
}
// 获取前一天的日期
export const getBeforeFormatDate = () => {
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate() - 1
  var strHour = date.getHours()
  var strMin = date.getMinutes()
  var strSec = date.getSeconds()
  if (month >= 1 && month <= 9)
  {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9)
  {
    strDate = '0' + strDate
  }
  if (strHour >= 0 && strHour <= 9)
  {
    strHour = '0' + strHour
  }
  if (strMin >= 0 && strMin <= 9)
  {
    strMin = '0' + strMin
  }
  if (strSec >= 0 && strSec <= 9)
  {
    strSec = '0' + strSec
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
  return currentdate
}