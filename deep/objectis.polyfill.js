// A polyfill of Object.is() 

if (!Object.is) {
  Object.is = function (a, b) {
    /* 
      
      NOTE: 只有两个corner case，是JS类型中的两个special value

      1. NaN (invalid number)
      特点：(1) typeof NaN === 'number' 
           (2) NaN !== NaN 
           (3) isNaN会进行强制转换、Number.isNaN(ES6)不会进行强制转换
      
      2. Negative Zero
      特点：-0 === 0
    
    */

    const nza = isNegativeZero(a)
    const nzb = isNegativeZero(b)
    
    if (nza || nzb) {
      return nza && nzb
    } else if (isInvalidNumber(a) && isInvalidNumber(b)) {
      return true
    } else if (x === y) {
      return true
    }
    return false

    function isInvalidNumber (x) {
      // NaN !== NaN
      // NOTE: only NaN is not equal to itself
      return x !== x 
    }

    function isNegativeZero (x) {
      // -0 === 0
      return x === 0 && (1 / x) === -Infinity
    }

  }
}

// some test
// console.log(Object.is(null, undefined))
// console.log(Object.is(-0, -0))
// console.log(Object.is(NaN, NaN))