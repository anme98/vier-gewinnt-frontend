import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public sizeX: number = 7;
  public sizeY: number = 6;
  public gameData: string[] = []
  public player: string[] = ["Player 1", "Player 2"];
  public currentPlayer: boolean = true;
  public gameOver: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.resetGame();
  }

  resetGame() {
    for (let i = 0; i < this.sizeX * this.sizeY; i++) {
      this.gameData[i] = 'white';
    }
    this.gameOver = false;
    this.currentPlayer = true;
  }

}
