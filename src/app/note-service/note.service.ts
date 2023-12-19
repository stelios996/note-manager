import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../note.model';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment.development';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  url: string = environment.firebaseUrl;
  modUrl: string = environment.firebaseModUrl;
  

  constructor(private http: HttpClient) { }

  getNotes() {
    //return this.http.get<Note[]>(this.url).pipe(

    const uID = this.getCurrentUserId();
    if (!uID)
      return null;
    
    return this.http.get<Note[]>(this.url+"?orderBy=\"userId\"&equalTo=\""+uID+"\"").pipe(
      map( res => {
        let notes = [];
        for(const key in res)
          notes.push({...res[key], id: key});
        return notes;
      })
    );
  }

  addNote(note: Note) {
    let completeNote = this.setNoteUserId(note);
    return this.http.post<Note>(this.url, completeNote);
  }

  updateNote(id: string, note: Note){
    return this.http.patch<Note>(this.modUrl+id+".json", note);
  }

  deleteNote(id: string){
    return this.http.delete<Note>(this.modUrl+id+".json");
  }

  toggleFavor(id:string, fav: boolean){
    return this.http.patch<Note>(this.modUrl+id+".json", {favorite: !fav});
  }

  getCurrentUserId(){
    const userData: { email:string; id: string; _token: string; _tokenExpirationDate: string; } = JSON.parse(localStorage.getItem('user')); 
    if(!userData)
      return null;

    return userData.id;
  }

  setNoteUserId(note: Note){
    note.userId = this.getCurrentUserId();
    return note;
  }

}
