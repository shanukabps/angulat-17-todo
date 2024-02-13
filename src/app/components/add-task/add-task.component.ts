import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  text!:string;
  day!:string;
  reminder:boolean = false;
  showAddTask!: boolean;
  subscription!: Subscription;
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()
  
  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => {
      console.log('value', value)
      this.showAddTask = value
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if(!this.text){
      alert('Please add a task')
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask)

    this.text=''
    this.day=''
    this.reminder=false
  }

}
