import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  @Input() todoAll: any;
  todo = {
    state: {},
    id: {},
    create_date: (new Date).toISOString(),
    adminId: '',
    title: '',
    description: '',
    type: ''
  };
  latest;
  constructor(private http: HttpClient, private globalsService: GlobalsService) { }

  ngOnInit() {
  }

  addTodo() {
    const adminId = this.globalsService.getAdminId()

    this.http.get(this.globalsService.getServerURL() + '/api/todo-latest').subscribe(data => {
      this.latest = data;
      let newTodo = this.todo;
      newTodo.state = 'inprogress';
      newTodo.id = (++this.latest.id).toString();
      newTodo.create_date = (new Date).toISOString();
      newTodo.adminId = adminId
      this.todo = { state: '', id: '', create_date: (new Date).toISOString(), adminId: '', title: '', description: '', type: '' };
      this.todoAll.unshift(newTodo);
      this.http.post(this.globalsService.getServerURL() + '/api/todo', newTodo)
        .subscribe(res => {
        }, (err) => {
          console.log(err);
        }
        );
    });
  }

}
