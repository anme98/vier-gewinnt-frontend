import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  // Inputs from parent
  @Input() index: number = 0;
  @Input() color: string = "white";
  // Outputs to parent
  @Output() indexEventEmitter: EventEmitter<number> = new EventEmitter();

  public empty: boolean = true;
  public xPos: number = 0;
  public yPos: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.xPos = this.index % 7 + 1;
    this.yPos = Math.floor(this.index / 7) + 1;
  }

  public placeChip(){
    if (this.empty){
      // this.color = "red";
      this.empty = false;
      console.log("x: "+this.xPos  + " + " + "y: "+ this.yPos);
    }
  }

  public sendFieldState() {
    this.indexEventEmitter.emit(this.index);
  }
}
