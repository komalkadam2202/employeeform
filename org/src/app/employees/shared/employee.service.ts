import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient ) { }
  
  
  setemployee(value){
    console.log('service call',value);
    return this.http.post('http://localhost:3500/send', value)
  }

  getdata(){
      return this.http.get('http://localhost:3500/get');
  }

  updatedata(id,data){
    
    return this.http.put('http://localhost:3500/' +id,data);
  }
  deletedata(id){
  // console.log(id);
    return this.http.delete(`http://localhost:3500/` +id);
  }

  getwithid(id){
 
  return this.http.get(`http://localhost:3500/` +id);
}

}
