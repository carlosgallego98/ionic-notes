import { Injectable } from '@angular/core';
import * as moment from "moment"
@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
  ) { }

  formatDate(date: any,format: string = "LLL"){
    moment.locale("es");
    return moment(date).format(format);
  }
}
