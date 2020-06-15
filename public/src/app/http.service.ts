import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    
  }

  getTasks() {
    return this._http.get('/tasks');
  }

  getOneTask(task_id) {
    return this._http.get(`/tasks/${task_id}`);
  }

  createTask(task) {
    return this._http.post('/tasks', task);
  }

  updateTask(task_id, task_data) {
    return this._http.put(`tasks/${task_id}`, task_data);
  }

  deleteTask(task_id) {
    return this._http.delete(`/tasks/${task_id}`);
  }
}
