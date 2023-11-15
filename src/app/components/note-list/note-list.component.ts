import { Component } from '@angular/core';
import { NoteService } from '../../note-service/note.service';
import { Note } from '../../note.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {

  notes$: Observable<Note[]> = this.ns.getNotes();

  constructor(private ns: NoteService) {}

  onAdd(){
      this.ns.addNote({description: "test test", favorite: false}).subscribe( () => {
        this.notes$ = this.ns.getNotes();
    });
  }

  onEdit(index: number){
    
  }

  onDelete(note: Note){
    this.ns.deleteNote(note.id).subscribe( () => {
      this.notes$ = this.ns.getNotes();
    });
  }

  onFavor(note: Note){
    this.ns.toggleFavor(note.id, note.favorite).subscribe( () => {
      this.notes$ = this.ns.getNotes();
    });
  }

}
