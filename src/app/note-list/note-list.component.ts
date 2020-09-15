import { Note } from './../models/note';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {

  @Input() noteList: Note[];
  private layout = "auto";

  constructor() { }

  ngOnInit() {}

}
