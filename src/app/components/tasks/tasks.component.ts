import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TaskItemComponent } from "../task-item/task-item.component";
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from "../add-task/add-task.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  imports: [CommonModule, TaskItemComponent, AddTaskComponent]
})
export class TasksComponent {
  tasks: Task[] = []
  constructor(private taskSv: TaskService) { }

  ngOnInit(): void {
    this.taskSv.getTasks().subscribe(tk => (
      this.tasks = tk
    ))
  }

  deleteTask(task: Task) {
    this.taskSv.deleteTask(task).subscribe(() =>
      this.tasks = this.tasks.filter(t =>
        t.id !== task.id
      ))
  }

  ontoggleReminder(task: Task) {
    console.log('task', task)
    task.reminder = !task.reminder;
    this.taskSv.updateTask(task).subscribe()
  }

  addTask(task: Task) {
    console.log('task', task)
    this.taskSv.addTask(task).subscribe(task => {
      this.tasks.push(task)
    })
  }

}
