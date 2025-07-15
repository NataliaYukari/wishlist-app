import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-status-selector',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './status-selector.html',
  styleUrl: './status-selector.css',
  standalone: true
})

export class StatusSelector implements OnInit {
  @Input() initialStatus: string = '';
  @Output() statusChange = new EventEmitter<string>();

  status: Status[] = [
    {value: 'To buy', viewValue: 'To buy'},
    {value: 'Got it!', viewValue: 'Got it!'}
  ];

  selectedStatus: string;

  constructor() {
    this.selectedStatus = this.status.length > 0 ? this.status[0].value : '';
  }

  ngOnInit(): void {
    if (this.initialStatus) {
      this.selectedStatus = this.initialStatus;
    }
  }

  onSelectChange(event: Event) {
    this.selectedStatus = (event.target as HTMLSelectElement).value;
    this.statusChange.emit(this.selectedStatus);
  }
}
