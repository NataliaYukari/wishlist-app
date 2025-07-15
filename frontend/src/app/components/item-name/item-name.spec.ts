import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemName } from './item-name';

describe('ItemName', () => {
  let component: ItemName;
  let fixture: ComponentFixture<ItemName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemName]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
