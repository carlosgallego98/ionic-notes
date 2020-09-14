import { HomePageModule } from './../home/home.module';
import { AuthService } from './../services/auth.service';
import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username: String = "jeangallego_";
  public password: String= "string";
  public isLoading = new BehaviorSubject(true);
  public isAuthenticated: Boolean;

  private LOGIN_QUERY = gql`
  query LoginQuery($username:String,$password:String){
    login(username:$username,password:$password){
      token
      userId
      expires
    }
  }`;

  constructor(
    public authService: AuthService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public apollo: Apollo,
    public router: Router
  ) {  }

  ngOnInit() {
    this.authService.autoLogin().then(( done )=>{
      if(done) this.loadHomePage();
    })
  }

  login(){
    this.loadingProgress();

    this.apollo.watchQuery({
      query: this.LOGIN_QUERY,
      notifyOnNetworkStatusChange: true,
      errorPolicy: "ignore",
      variables: { username: this.username,password: this.password }
    }).valueChanges.subscribe( ({ data, loading })=>{
        this.isLoading.next(loading);
        if(data['login'] != null){
          this.authService.login(data['login']);
          this.loadHomePage();
        }else{
          this.errorAlert();
        }
    })
  }

  loadHomePage(){
    this.router.navigateByUrl("/notes",{ replaceUrl: true })
  }

  loadingProgress(){
    this.loadingController.create({
      animated:true,
      message:"Iniciando Sesión",
      spinner: "dots"
    }).then( progress => {
      this.isLoading.subscribe( loading=>{
        if(loading){
          progress.present();
        }else{
          progress.dismiss();
        }
      })
      
    })
  }

  errorAlert(){
    this.alertController.create({
      animated:true,
      header: "Error",
      subHeader: "Algo salió mal",
      message: "Revisa tus credenciales e inténtalo de nuevo",
      buttons:[{ text: "Entendido" }]
    }).then( alert => { alert.present() } );
  }

}
