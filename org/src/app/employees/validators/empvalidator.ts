import { AbstractControl } from '@angular/forms';

export class Validateemp {
    static skillvali(control: AbstractControl) : { [key: string]: boolean } | null{
        console.log("----------",control.value.length);
        if(control.value.length == 1){
            return { skillv : true };
        }
           return null;
    }

    static hobbiesvali(control: AbstractControl) : { [key: string]: boolean } | null{
        console.log(control.value)
        const data1 = control.value;
        console.log("----------////",data1);
        var data = 0;
        for (var i = 0; i < data1.length; i++) {
            if (data1[i] == true) {
                data++;
            }
         }
    
       if (data == 1) {
           return { skillvs : true };
      }
      return null;
    }
}