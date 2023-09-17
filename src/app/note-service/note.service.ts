import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../note.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  postNote(note: Note) {
    return this.http.post<{name:string}>('https://notes-manager-5c037-default-rtdb.europe-west1.firebasedatabase.app/notes.json', note);
  }

  getNotes() {
    return this.http.get<{[key:string]: Note}>('https://notes-manager-5c037-default-rtdb.europe-west1.firebasedatabase.app/notes.json')
    .pipe(map( res => {
      const notes = [];
      for(const key in res){
        if(res.hasOwnProperty(key))
          notes.push({...res[key], id: key});
      }
      return notes;
    }));
  }

}
