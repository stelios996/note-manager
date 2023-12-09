import { Component, OnDestroy, OnInit } from '@angular/core';
import { NoteService } from '../../note-service/note.service';
import { Note } from '../../note.model';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { AuthService } from 'src/app/auth-service/auth.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy{

  reloadNotes$ = new BehaviorSubject<boolean>(false);
  notes$: Observable<Note[]> = this.reloadNotes$.pipe(switchMap(() => this.ns.getNotes()));
  private userSub: Subscription;
  auth: boolean = false;

  constructor(private ns: NoteService, public dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe( user => this.auth = user? true : false );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  onEdit(note?: Note){
    const dialogRef = this.dialog.open( EditNoteComponent, { data: note, width:'40rem'});

    dialogRef.afterClosed().subscribe( result => {
      if(!note && result)
        this.ns.addNote(result).subscribe( () => this.reloadNotes$.next(true) );
      else if(note && result)
        this.ns.updateNote(note.id, result).subscribe( () => this.reloadNotes$.next(true) );
    });
  }

  onDelete(note: Note){
    this.ns.deleteNote(note.id).subscribe( () => this.reloadNotes$.next(true) );
  }

  onFavor(note: Note){
    this.ns.toggleFavor(note.id, note.favorite).subscribe( () => this.reloadNotes$.next(true) );
  }

}
