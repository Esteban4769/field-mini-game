import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultModalComponent } from './game-result-modal.component';

describe('GameResultModalComponent', () => {
  let component: GameResultModalComponent;
  let fixture: ComponentFixture<GameResultModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameResultModalComponent]
    });
    fixture = TestBed.createComponent(GameResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
