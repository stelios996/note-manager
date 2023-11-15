import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../note.model';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  url: string = environment.firebaseUrl;
  delUrl: string = environment.firebaseUrlDel;
  
  constructor(private http: HttpClient) { }

  getNotes() {
    //return this.http.get<{[key:string]: Note}>(this.url).pipe(
    return this.http.get<Note[]>(this.url).pipe(
      map( res => {
        let notes = [];
        for(const key in res)
            notes.push({...res[key], id: key});
        //console.log(notes);
        return notes;
      })
    );
  }

  addNote(note: Note) {
    return this.http.post<{name:string}>(this.url, note);
  }

  deleteNote(id: string){
    return this.http.delete<Note>(this.delUrl+id+".json");
  }

  toggleFavor(id:string, fav: boolean){
    return this.http.patch<Note>(this.delUrl+id+".json", {favorite: !fav});
  }

}
