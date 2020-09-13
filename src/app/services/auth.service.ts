import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUserSub = new Subscription;
  private isLoading : Boolean; 
  private LOGIN_QUERY = gql`
    query LoginQuery ($username: String,$password:String){
      login(username:$username,password:$password){
        token
        userId
        expires
      }
  }`;

  constructor(private apollo: Apollo,
    public loadingController: LoadingController,
    ) { }
  
  async toggleAlert() {
    await this.loadingController.create({
      cssClass: 'my-custom-class',
      animated: true,
      message: 'Iniciando sesión',
      translucent: true,
      backdropDismiss: false
    }).
    then(async (alert)=>{
      await alert.present().then(() => {
        if (!this.isLoading) {
          alert.dismiss();
        }
      });
    })
  }

  login(username:string,password:string): void{
    this.authUserSub = this.apollo.watchQuery<any>({
      query: this.LOGIN_QUERY,
      variables: { username, password }
    })
    .valueChanges
    .subscribe(({ data, loading }) => {
      this.isLoading = loading;
      this.toggleAlert();
    })
  }

  logout(): void{ }

  isAuthenticated(): boolean{ return false; }
}
