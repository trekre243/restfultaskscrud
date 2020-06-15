import { Component } from '@angular/core';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks = [];

  newTitle: string = '';
  newDescription: string = '';

  editTitle: string = '';
  editDescription: string = '';
  editIndex: number;

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    this._httpService.getTasks().subscribe(data => {
      this.tasks = data['data'];
    });
  }

  createTask() {
    console.log('createTask() entered')
    this._httpService.createTask({
      title: this.newTitle,
      description: this.newDescription
    }).subscribe(data => {
      console.log('data received: ', data);
      if(data['message'] == 'success') {
        this.tasks.push(data['data']);
        this.newTitle = "";
        this.newDescription = "";
      }
    })
  }

  editTask(i) {
    this.editIndex = i;
    this.editTitle = this.tasks[i].title;
    this.editDescription = this.tasks[i].description;
  }

  saveEditTask() {
    this._httpService.updateTask(this.tasks[this.editIndex]._id, {title: this.editTitle, description: this.editDescription}).subscribe(data => {
      if(data['message'] == 'success') {
        this.tasks[this.editIndex].title = this.editTitle;
        this.tasks[this.editIndex].description = this.editDescription;

        this.editIndex = -1;
        this.editTitle = '';
        this.editDescription = '';
      }
    });
  }

  deleteTask(i) {
    this._httpService.deleteTask(this.tasks[i]._id).subscribe(data => {
      if(data['message'] == 'success') {
        this.tasks.splice(i, 1);
      }
    });
  }
  
}
