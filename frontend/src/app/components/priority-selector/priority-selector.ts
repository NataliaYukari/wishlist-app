import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-priority-selector',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './priority-selector.html',
  styleUrl: './priority-selector.css',
  standalone: true
})

export class PrioritySelector implements OnInit {
  @Input() initialPriority: string = '';
  @Output() priorityChange = new EventEmitter<string>();

  priorities: Priority[] = [
    {value: 'Low', viewValue: 'Low'},
    {value: 'Medium', viewValue: 'Medium'},
    {value: 'High', viewValue: 'High'}
  ];

  selectedPriority: string;

  constructor() {
    this.selectedPriority = this.priorities.length > 0 ? this.priorities[0].value : '';
  }

  ngOnInit() {
    if (this.initialPriority) {
      this.selectedPriority = this.initialPriority;
    }
  }

  onSelectChange(event: Event) {
    this.selectedPriority = (event.target as HTMLSelectElement).value;
    this.priorityChange.emit(this.selectedPriority);
  }
}
