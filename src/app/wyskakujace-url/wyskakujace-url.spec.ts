import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WyskakujaceUrl } from './wyskakujace-url';

describe('WyskakujaceUrl', () => {
  let component: WyskakujaceUrl;
  let fixture: ComponentFixture<WyskakujaceUrl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WyskakujaceUrl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WyskakujaceUrl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
