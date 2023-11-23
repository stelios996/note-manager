import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from 'src/app/note.model';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit{

  dialogData: Note;
  dialogForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditNoteComponent>, 
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Note) { }

  ngOnInit(): void {
    let desc = this.data? this.data.description : '';
    let fav = this.data? this.data.favorite : false;
    this.dialogForm = new FormGroup({
      'description': new FormControl(desc), 
      'favorite': new FormControl(fav)
    });
  }

  onCancel(){
    this.dialogForm.reset();
    this.dialogRef.close();
  }

  onSubmit(){
    this.dialogData = this.dialogForm.value;
    this.dialogRef.close(this.dialogData);
  }

}
