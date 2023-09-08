import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-game-result-modal',
  templateUrl: './game-result-modal.component.html',
  styleUrls: ['./game-result-modal.component.scss'],
})
export class GameResultModalComponent {
  playerScore: number;
  computerScore: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { playerScore: number, computerScore: number,
  }) {
    this.playerScore = data.playerScore;
    this.computerScore = data.computerScore;
  }
}
