import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private userid;

  constructor(
    private storage: Storage
    ) {  }

  login(loginData: any){
    this.saveUserData(loginData.userId,loginData.token);
  }

  saveUserData(id: string, token: string) {
    this.storage.set("GC_USER_ID", id);
    this.storage.set("GC_AUTH_TOKEN", token);
    localStorage.setItem("GC_AUTH_TOKEN",token);
    this.setUserId(id);
  }

  setUserId(id: string) {
    this.userid = id;
  }

  logout() {
    this.storage.remove("GC_USER_ID");
    this.storage.remove("GC_AUTH_TOKEN");
    localStorage.removeItem("GC_AUTH_TOKEN");
    this.userid = null;
  }

  async autoLogin() {
    return this.storage.get("GC_AUTH_TOKEN").then( id =>{
      if (id) {
        this.setUserId(id);
        return true;
      }
      return false;
    });
  }
}
