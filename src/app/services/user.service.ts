import { User } from './../models/user';
import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  USER_QUERY = gql`{
        user{
          username
          name
        }
    }`;
  
  constructor(private apollo: Apollo) { }

  getLoggedUserQuery() {
    return this.apollo.query({
      query: this.USER_QUERY,
    })
  }
}
