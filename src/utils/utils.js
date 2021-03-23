/**
 * 全局公共方法
 * @author 谭邻宣
 * @date 2020/7/4 14:35
 **/


/***
 *  字符串操作，保留两位小数 ，不四舍五入 ，且末尾不为零 ，不补零
 * @param num  Number  需要转换的数字
 * @param decimal  Number  // 小数位， 默认长度2
 * @returns {string|number}
 */
export function formatDecimal(num, decimal) {
    let dec = decimal || 2;
    let isNum = typeof num === 'number' && !isNaN(num);

    if (!isNum) return '-';  // 如果非数字类型 ，返回 ' - '
    num = num.toString();  //转为字符串

    let intLength = num.indexOf('.') // 整数部分的长度
    if (intLength === -1) return parseInt(num)  //如果是整数 ， 直接返回

    let sInt = num.substr(0, intLength), // 截取整数部分
        sFloat = num.substr(intLength + 1, dec); // 截取小数部分

    for (let i = sFloat.length - 1; i >= 0; i--) {  // 倒序遍历字符串，去掉末尾0
        if (sFloat[i] !== '0') break; // 不为0 则终止循环
        sFloat = sFloat.slice(0, i)
    }

    if (sFloat !== '') {
        return parseFloat(sInt + '.' + sFloat)
    } else {
        return parseFloat(sInt)
    }

}

/***
 * Math.pow， 保留两位小数 ，不四舍五入 ，且末尾不为零 ，不补零 ，大数字不精确
 * @param num  Number  需要转换的数字
 * @param decimal  Number  // 小数位， 默认长度2
 * @returns {string|number}
 */
export function toFixed (num, decimal){
    let dec = decimal || 2;
    let isNum = typeof num === 'number' && !isNaN(num);
    if (!isNum) return '-';  // 如果非数字类型 ，返回 ' - '
    return ~~(Math.pow(10, dec) * num) / Math.pow(10, dec)
}


/***
 * 获取url 参数对象
 * @returns {{}}
 */
export function getUrlKey(){ //截取url 参数
    let urlParams={};
    let name,value,str=location.href,num=str.indexOf("?"); //取得整个地址栏
    str=str.substr(num+1); //取得所有参数 stringvar.substr(start [, length ]
    let arr=str.split("&"); //各个参数放到数组里
    for(let i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            urlParams[name] = decodeURI(value)
        }
    }
    return  urlParams ;
}

/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  节流阈值，单位毫秒（ms）
 * @return {Function}     返回一个节流处理的函数
 */

export function debounce(fn, delay) {
    let timer
    return function () {
        let that = this,args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(that, args)
        }, delay)
    }
}


/***
 *  对象数组根据key值排序, 用法 Array.sort(bySort('number',false))
 * @param key  比较key 的值
 * @param rev  true => 升序  false => 降序
 * @returns {function(...[*]=)}
 */
export function bySort(key,rev){
    rev = rev ? 1 : -1;
    return (pre, next)=>{
        let preNum = Number(pre[key]) ,
            nextNum = Number(next[key]);
        if(preNum < nextNum) return rev * -1;
        if(preNum > nextNum) return rev * 1;
        return 0;
    }
}

//计算适配像素

export function setFontSize(size){
    let designW =1920;
    return document.body.offsetWidth / designW * size;
}


