import { Note } from './../models/note';
import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private GETUSERNOTES = gql`{
    notes{
      title
      body
      slug
      userId
      createdAt
      updatedAt
    }
  }`;
  private notes: Note[] = new Array();

  constructor(
    public apollo: Apollo
  ) {}

  loadUserNotes(){
    this.notes = [];
    this.apollo.watchQuery({
      query: this.GETUSERNOTES,
      notifyOnNetworkStatusChange:true,
      errorPolicy: "ignore"
    }).valueChanges.subscribe( observer =>{
      observer.data['notes'].forEach(element => {
        this.notes.push(new Note(element))
      });
    })
    return this.notes;
  }

  deleteUserNote(noteId:"String"){}

  addNote(note: Note){}
}
