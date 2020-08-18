import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardValueComponent } from './board-value/board-value.component';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  moves: number = 0;
  board: any[][] = []
  mario = { row: 0, col: 0 };
  boardView;
  sprite: number = 0

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp': this.up(); break;
      case 'ArrowDown': this.down(); break;
      case 'ArrowLeft': this.left(); break;
      case 'ArrowRight': this.right(); break;
      default: "";
    }
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.getBoardValue();
  }

  getBoardValue() {
    const dialogRef = this.dialog.open(BoardValueComponent, {
      width: '300',
      closeOnNavigation: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardView = result;
        let col = [];
        this.board.length = result.row
        for (let i = 0; i < result.column; i++) {
          col.push({ sprite: false, mario: false })
        }
        for (let i = 0; i < result.row; i++) {
          this.board[i] = JSON.parse(JSON.stringify(col));
        }
        let sprite = Math.floor((result.row + result.column) / 2)
        for (let i = 0; i < sprite; i++) {
          let x = Math.floor(Math.random() * result.row);
          let y = Math.floor(Math.random() * result.column);
          if (!this.board[x][y].sprite) {
            this.board[x][y].sprite = true;
            this.sprite++;
          }
          else {
            i--
          }
        }
        this.mario.row = Math.floor(result.row / 2)
        this.mario.col = Math.floor(result.column / 2)
        this.board[this.mario.row][this.mario.col].mario = true;
        this.checkSprite();
      }
    });
  }

  up() {
    if (this.mario.row > 0) {
      this.moves++
      this.board[this.mario.row][this.mario.col].mario = false;
      this.mario.row--
      this.board[this.mario.row][this.mario.col].mario = true;
      this.checkSprite();
    }
  }
  down() {
    if (this.boardView && this.boardView.row - 1 > this.mario.row) {
      this.moves++
      this.board[this.mario.row][this.mario.col].mario = false;
      this.mario.row++
      this.board[this.mario.row][this.mario.col].mario = true;
      this.checkSprite();
    }
  }
  left() {
    if (this.mario.col > 0) {
      this.moves++
      this.board[this.mario.row][this.mario.col].mario = false;
      this.mario.col--
      this.board[this.mario.row][this.mario.col].mario = true;
      this.checkSprite();
    }
  }
  right() {
    if (this.boardView && this.boardView.column - 1 > this.mario.col) {
      this.moves++
      this.board[this.mario.row][this.mario.col].mario = false;
      this.mario.col++
      this.board[this.mario.row][this.mario.col].mario = true;
      this.checkSprite();
    }
  }

  checkSprite() {
    if (this.board[this.mario.row][this.mario.col].sprite) {
      this.board[this.mario.row][this.mario.col].sprite = false;
      this.sprite--;
      if (this.sprite == 0) {
        alert(`Game Over. Total moves to save princess: ${this.moves}`)
      }
    }
  }
}
