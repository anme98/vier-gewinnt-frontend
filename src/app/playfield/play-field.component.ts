import {Component, Host, Input, OnInit} from '@angular/core';
import {GameComponent} from "../game/game.component";

@Component({
  selector: 'app-playfield',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.css']
})
export class PlayFieldComponent implements OnInit {

  @Input() playField: string[] = [];
  @Input() sizeX: number = 0;
  @Input() currentPlayer = true;
  public gameComponent: GameComponent;

  // @ViewChild and @Host
  constructor(@Host() gameComponent: GameComponent) {
    this.gameComponent = gameComponent;
  }

  ngOnInit(): void {
  }

  isBottom(fieldId: number): boolean {
    return (fieldId >= 35);
  }

  isEmpty(fieldId: number): boolean {
    return (this.playField[fieldId] === "white");
  }

  addState(fieldId: number) {
    (this.currentPlayer) ? this.playField[fieldId] = "red" : this.playField[fieldId] = "yellow";
    this.checkForWinner(fieldId);
    this.gameComponent.currentPlayer = !this.currentPlayer;
  }

  playConnectFour(fieldId: number) {
    if (!this.gameComponent.gameOver) {
      console.info(fieldId)
      this.checkForEmptyFieldInCol(fieldId)
    }
  }

  checkForEmptyFieldInCol(fieldId: number) {
    let tmpFieldId = fieldId;
    // Falls das Feld leer ist und das Feld darunter auch leer ist und nicht in der letzten Reihe wiederhole die Abfrage für das Feld darunter
    if (this.isEmpty(tmpFieldId) && !this.isBottom(tmpFieldId) && this.isEmpty(tmpFieldId + 7)) {
      this.checkForEmptyFieldInCol(tmpFieldId + 7);
    } else if (!this.isEmpty(tmpFieldId)) { // Falls das Feld nicht leer ist wiederhole die Abfrage für das Feld darüber
      (fieldId >= 7) ? this.checkForEmptyFieldInCol(tmpFieldId - 7) : alert('This Column is full');
    } else { // Ansonsten füge hier eine Farbe hinzu
      this.addState(tmpFieldId)
    }
  }

  checkForWinner(id: number) {
    this.checkVerticalAndHorizontal(id);
    if (this.gameComponent.gameOver) console.log(`Game Over! The winner is ${this.playField[id]}`)
  }

  checkVerticalAndHorizontal(id: number) {
    const selectedCol = this.getSelectedCol(id);
    const selectedRow = this.getSelectedRow(id);
    this.gameComponent.gameOver = this.checkDiagonal();
    this.checkForFourOccurencies(selectedRow);
    this.checkForFourOccurencies(selectedCol);
  }

  checkForFourOccurencies(array: string[]) {
    // wenn 4 Felder nebeneinander die gleiche Farbe haben und nicht weiß sind
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== "white") {
        if (array[i] === array[i + 1] && array[i + 1] === array[i + 2] && array[i + 2] === array[i + 3]) {
          this.gameComponent.gameOver = true;
        }
      }
    }
  }

  getSelectedCol(id: number): string[] {
    let xPos = id % 7;
    let selectedCol = []
    for (let i = xPos; i < this.playField.length; i = i + 7) {
      selectedCol.push(this.playField[i]);
    }
    return selectedCol;
  }

  getSelectedRow(id: number): string[] {
    let xPos = id % 7 + 1;
    let selectedRow = this.playField;
    if (xPos === 1) {
      selectedRow = selectedRow.slice(id, id + 7);
    } else if (xPos === 2) {
      selectedRow = selectedRow.slice(id - 1, id + 6);
    } else if (xPos === 3) {
      selectedRow = selectedRow.slice(id - 2, id + 5);
    } else if (xPos === 4) {
      selectedRow = selectedRow.slice(id - 3, id + 4);
    } else if (xPos === 5) {
      selectedRow = selectedRow.slice(id - 4, id + 3);
    } else if (xPos === 6) {
      selectedRow = selectedRow.slice(id - 5, id + 2);
    } else {
      selectedRow = selectedRow.slice(id - 6);
    }
    return selectedRow;
  }

  private checkDiagonal(): boolean {
    let currentColor = this.gameComponent.currentPlayer ? "red" : "yellow";
    for (let y = 0; y < this.gameComponent.sizeY; y++) {
      for (let x = 0; x < this.gameComponent.sizeX; x++) {
        if (
          ( // diagonal top right
            this.matrix(x + 0, y + 0) === currentColor &&
            this.matrix(x + 1, y + 1) === currentColor &&
            this.matrix(x + 2, y + 2) === currentColor &&
            this.matrix(x + 3, y + 3) === currentColor
          ) || ( // diagonal top left
            this.matrix(x - 0, y + 0) === currentColor &&
            this.matrix(x - 1, y + 1) === currentColor &&
            this.matrix(x - 2, y + 2) === currentColor &&
            this.matrix(x - 3, y + 3) === currentColor
          )
        )
          return true;
      }
    }
    return false;
  }

  // Array to Matrix
  private matrix(x: number, y: number): string | null {
    let matrix: string[][] = [];
    for (let y = 0; y < this.gameComponent.sizeY; y++) {
      let xArray: string[] = [];
      for (let x = 0; x < this.gameComponent.sizeX; x++) {
        xArray[x] = this.playField[y * this.gameComponent.sizeX + x];
      }
      matrix[y] = xArray;
    }
    return (matrix[y] !== undefined && matrix[y][x] !== undefined) ? matrix[y][x] : null;
  }

}
