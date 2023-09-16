import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  postNote(note: Note) {
    return this.http.post<Note>('https://notes-manager-5c037-default-rtdb.europe-west1.firebasedatabase.app/notes.json', note);
  }

  getNotes() {
    return this.http.get<Note[]>('https://notes-manager-5c037-default-rtdb.europe-west1.firebasedatabase.app/notes.json');
  }

}
