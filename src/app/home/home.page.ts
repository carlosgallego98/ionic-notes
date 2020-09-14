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

  constructor(
    public authservice: AuthService,
    public router: Router,
    public apollo: Apollo
  ) {}

  ngOnInit(){
    this.apollo.watchQuery({
      query: this.USERQUERY,
      notifyOnNetworkStatusChange: true,
    })
  }



  //Login specific Methods
  logout(){
    this.authservice.logout();
    this.router.navigateByUrl("login", {replaceUrl: true})
  }
  ionViewDidEnter(){
    this.authservice.isAuthenticated().toPromise().then( authenticated=>{
      console.log(authenticated)
      if(!authenticated){
        this.router.navigateByUrl("login", {replaceUrl: true})
      }
    });
  }

}
