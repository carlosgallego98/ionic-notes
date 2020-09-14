import { User } from './../models/user';
import { AlertController } from '@ionic/angular';
import { gql, Apollo } from 'apollo-angular';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  USERQUERY = gql`{
    user{
      name
      username
    }
  }`;
  private user: User;

  constructor(
    public authService: AuthService,
    public router: Router,
    public apollo: Apollo,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.authService.autoLogin().then(( done )=>{
      if(!done) this.loginAlert();
    })
    this.loadUser();
  }

  loadUser(){
    this.apollo.watchQuery({
      query:this.USERQUERY,
      notifyOnNetworkStatusChange:true,
      errorPolicy: "ignore",
    }).valueChanges.subscribe(response=>{
      this.user = new User(response.data['user']);
    })
  }

  //Login specific Methods
  logout() {
    this.authService.logout();
    this.router.navigateByUrl("login", { replaceUrl: true })
  }
  loginAlert() {
    this.alertController.create({
      header: "No has iniciado sesión",
      message: "Debes iniciar sesión",
      backdropDismiss:false,
      buttons: [
        {
          text: "Iniciar Sesión", handler: () => {
            this.router.navigateByUrl("login", { replaceUrl: true });
          }
        }]
    }).then(alert => { alert.present() })
  }

}
