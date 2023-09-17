import { Component, OnInit } from '@angular/core';
import { NoteService } from './note-service/note.service';
import { Note } from './note.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'note-manager-app';

  noteList$: Observable<Note[]> = this.ns.getNotes();

  constructor(private ns: NoteService) {}

  postRandom(){
      this.ns.postNote({title: "test", description: "test test", favorite: true}).subscribe(_ =>
      this.noteList$ = this.ns.getNotes()
    );
  }
}
