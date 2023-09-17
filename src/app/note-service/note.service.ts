import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../note.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  // ta sxolia svista sto telos ee

  url: string = environment.firebaseUrl;

  constructor(private http: HttpClient) { }

  postNote(note: Note) {
    // komple einai auto
    return this.http.post<{name:string}>(this.url, note);
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<{[key:string]: Note}>(this.url).pipe(
      map( res => {
        let notes = [];
        for(const key in res)
          notes.push({...res[key], id: key});
        return notes;
      })
    );
  }

  // mporeis na kaneis kai polling edw, dld kathe liga seconds na koitaei to backend gia allages
  // psaxto, ena rxjs operator thelei.
}