import { Component } from '@angular/core';
import { Cell } from './types/Cell';
import { CellState } from './types/cellState';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GameResultModalComponent } from './game-result-modal/game-result-modal.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cells: Cell[] = Array(100).fill(null).map(() => ({ state: CellState.Neutral }));
  cellStates = CellState;

  playerScore = 0;
  computerScore = 0;

  inputTimeout = new FormControl('1000',[
    Validators.required,
    Validators.pattern('^[0-9]+$')
  ]);
  settedTimeout = 0;
  gameTimer: any;
  gameOver = false;

  handleCellClick = (index: number) => {
    if (this.cells[index].state === CellState.Active) {
      this.cells[index].state = CellState.Clicked;
      this.playerScore++;
      this.checkScores();
      this.playGame();
    }
  };

  reset() {
    clearTimeout(this.gameTimer);
    this.cells = Array(100).fill(null).map(() => ({ state: CellState.Neutral }));
  }

  startGame = () => {
    this.reset();
    this.gameOver = false;
    this.playerScore = 0;
    this.computerScore = 0;

    const input = this.inputTimeout.value ? +this.inputTimeout.value : 0;
    this.settedTimeout = input > 0 ? input : 1000;

    setTimeout(() => {
        this.playGame();
      }, 1000
    );

  };

  playGame() {
    if (this.gameOver) {
      return;
    }

    const availabaleIndexes = this.getAvailableCellIndexes();

    const randomIndex = availabaleIndexes[Math.floor(Math.random() * availabaleIndexes.length)];

    this.cells[randomIndex].state = CellState.Active;

    this.gameTimer = setTimeout(() => {
      if (this.cells[randomIndex].state !== CellState.Clicked) {
        this.cells[randomIndex].state = CellState.Lost;
        this.computerScore++;
        this.checkScores();
        this.playGame();
      }
    }, this.settedTimeout);
  }

  getAvailableCellIndexes(): number[] {
    return this.cells
      .filter(cell => cell.state === CellState.Neutral)
      .map((_, index) => index);
  }

  checkScores () {
    if (this.computerScore === 10 || this.playerScore === 10) {
      this.gameOver = true;
      clearTimeout(this.gameTimer);
      this.openGameResultModal();
    }
  }

  constructor(private dialog: MatDialog) {}

  openGameResultModal() {
    const dialogConfig = this.configureDialog();

     const dialogRef = this.dialog.open(GameResultModalComponent, {
      ...dialogConfig,
    });
  }

  configureDialog() {
    const config = new MatDialogConfig();

    config.width = '250px';
    config.height = '200px';
    config.data = {
      playerScore: this.playerScore,
      computerScore: this.computerScore,
    };

    return config;
  }
}
