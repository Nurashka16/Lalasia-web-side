/**
 * Создает строку query параметров
 */
export class ParamQueryCollection {
   private params = new Map<string, string | undefined>();

   public set(key: string, value: string | undefined) {
     this.params.set(key, value);
   }
 
   public createParamQuery(): string {
     let result = "";
     this.params.forEach((value, key) => {
       if (value) {
         result += `${key}=${value}&`;
       }
     });
 
     if (result.length !== 0) {
       result = "?" + result.slice(0, -1);
     }
 
     return result;
   }
 }