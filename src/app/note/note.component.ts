import { Note } from './../models/note';
import { HelpersService } from './../helpers.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  @Input() note: Note;

  constructor(
    public helpersService: HelpersService
  ) { }

  ngOnInit() {}

}
