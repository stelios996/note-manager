import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../note.model';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  url: string = environment.firebaseUrl;
  
  constructor(private http: HttpClient) { }

  postNote(note: Note) {
    return this.http.post<{name:string}>(this.url, note);
  }

  getNotes() {
    return this.http.get<{[key:string]: Note}>(this.url).pipe(
      map( res => {
        let notes = [];
        for(const key in res)
            notes.push({...res[key], id: key});
        return notes;
      })
    );
  }

}
