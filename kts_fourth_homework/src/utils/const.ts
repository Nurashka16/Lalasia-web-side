export const PRODUCT = '/product/';
export const ABOUT_US = '/about';
export const CATEGORIES = '/categories';
export const PRODUCTS_CATEGORY = '/products_category/';
export const BASKET = '/basket';
export const AUTH = '/auth';
export const HOME = '/';
export const EMPTY_PAGE = '/emptyPage'
export const SIGN_UP = '/signUp'
export const SIGN_IN= '/signIn'
// 1 const sum = (firstNumber: number, ...numberArray: number[]) => {
//   if (numberArray.length == 0) return "Min 2 number";
//   return (
//     firstNumber +
//     numberArray.reduce((sum, value) => {
//       return sum + value;
//     }, 0)
//   );
// };
// console.log(sum(1));


//2 type PowResult = number | ((secondNum: number)=> number)
// function pow(firstNum:number, secondNum: number):number;
// function pow(firstNum:number): ((secondNum: number)=> number)
// function pow(firstNum:number, secondNum?:number): PowResult {
//    if(typeof(secondNum) == "number") {
//       return Math.pow(firstNum, secondNum);
//    }
//    else {
//       return (secondNum)=>{return  Math.pow(firstNum,secondNum)}
//    }
// }
// console.log(pow(2)(2));


//3 const intersection = (firstArr:number[], secondArr:number[]) : number[] => {
//    if (firstArr.length == 0 || secondArr.length == 0) {
//      return [];
//    }
//    const result = new Set<number>();
//    firstArr.forEach((firstArrNum) =>
//      secondArr.forEach((secondArrNum) => {
//        if (secondArrNum == firstArrNum && !result.has(secondArrNum)) {
//          result.add(firstArrNum);
//        }
//      })
//    );
//    return Array.from(result)
//  };
//  console.log(intersection([1,1,1],[1,2,3]));

//4 const sort = (string: string) => {
//    let wordsSortedLength = string
//      .toLowerCase()
//      .split(" ")
//      .sort((a, b) => a.length - b.length);
//    const wordsSortedUnicode = wordsSortedLength.map((item) =>
//      item
//        .split("")
//        .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
//        .join("")
//    );
//    return wordsSortedUnicode;
//  };
//  console.log(sort("123 224"));
//  export default sort;
//# sourceMappingURL=index.js.map


// const removeAnagrams = (arr: string[]) => {
//    const result:string[] = [];
//    const map = new Map<string, { isUnique: boolean; index: number }>();
 
//    const arrSorted = arr.map((item) => {
//      return item.split("").sort().join("");
//    });
 
//    arrSorted.forEach((item, index) => {
//      if (map.get(item)) {
//        return map.set(item, { isUnique: true, index });
//      }
//      return map.set(item, { isUnique: false, index });
//    });
 
//    map.forEach((item) => {
//      if (item.isUnique == false) {
//        return result.push(arr[item.index]);
//      }
//    });
//    return console.log(result);
   
//  };
 
//  removeAnagrams(["cat", "act", "arc", "cat", "arc", "cat","a"]);

// 6 interface Array<T> {
//    count(): number;
//    insert(index: number, item: T): T[];
//    remove(item: T): T[];
//  }
//  const patchArrays = ():void=> {
//    Array.prototype.count = function () {
//      return this.length;
//    };
//    Array.prototype.insert = function (index, item) {
//      if (index < 0) {
//        this.unshift(item);
//        return this;
//      }
//      if (index > this.length) {
//        this.push(item);
//        return this;
//      }
//      // if(this[index]==undefined) проверить
//      this.splice(index, 0, item);
//      return this;
//    };
//    Array.prototype.remove = function (item) {
//      if (this.includes(item)) {
//        this.splice(this.indexOf(item), 1);
//        return this;
//      }
//      return this;
//    };
//  }
 
//  patchArrays()

// 7 const multiply = (arg1: number) => (arg2: number) => {
//    return console.log(arg1 * arg2);
//    ;
//  };
 
//  const multiplyByTen = multiply(10);
//  multiplyByTen(2);  



// 8 const getNumberProps = (nonSortedObj: {}) => {
//    const result: string[] = [];
//    const sort = (obj: {}) => {
//      for (const key in obj) {
//        if (typeof obj[key] == "object") {
//          sort(obj[key]);
//        }
//        if (typeof obj[key] == "number") {
//          result.push(key);
//        }
//      }
//    };
//    sort(nonSortedObj);
 
//    return console.log(result);
//  };
//  getNumberProps({ a: 1, c: 1, b: { c: 2, d: 1, e: "1" }, m: 3 });