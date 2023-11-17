import { Component } from '@angular/core';
import { NoteService } from '../../note-service/note.service';
import { Note } from '../../note.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {

  //notes$: Observable<Note[]> = this.ns.getNotes();
  notes$: Observable<Note[]>;

  constructor(private ns: NoteService, public dialog: MatDialog) { this.getNotes() }

  onEdit(note?: Note){
    const dialogRef = this.dialog.open( EditNoteComponent, { data: note, width:'40rem'});

    dialogRef.afterClosed().subscribe( result => {
      if(!note && result)
        this.ns.addNote(result).subscribe( () => this.getNotes() );
      else if(note && result)
        this.ns.updateNote(note.id, result).subscribe( () => this.getNotes() );
    });
  }

  onDelete(note: Note){
    this.ns.deleteNote(note.id).subscribe( () => this.getNotes() );
  }

  onFavor(note: Note){
    this.ns.toggleFavor(note.id, note.favorite).subscribe( () => this.getNotes() );
  }

  getNotes(){
    this.notes$ = this.ns.getNotes();
  }
}
