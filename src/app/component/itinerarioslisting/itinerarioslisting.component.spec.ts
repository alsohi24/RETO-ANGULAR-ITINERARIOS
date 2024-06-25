import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarioslistingComponent } from './itinerarioslisting.component';

describe('ItinerarioslistingComponent', () => {
  let component: ItinerarioslistingComponent;
  let fixture: ComponentFixture<ItinerarioslistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItinerarioslistingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItinerarioslistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
