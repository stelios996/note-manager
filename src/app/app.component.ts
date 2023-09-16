import { Component, OnInit } from '@angular/core';
import { NoteService } from './note-service/note.service';
import { Note } from './note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'note-manager-app';

  notes: Note[] = [];

  constructor(private ns: NoteService) {}

  ngOnInit() {
   
    this.ns.getNotes().subscribe( res => {
      console.log(res);
      this.notes = res;
    } );
  }

  postRandom(){
    this.ns.postNote({title: "test", description: "test test", favorite: true}).subscribe(res => console.log(res));
    this.ns.postNote({title: "2test", description: "2test test", favorite: true}).subscribe(res => {console.log(res)});
  }
  
}
