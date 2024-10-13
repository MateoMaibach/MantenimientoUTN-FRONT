import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderadmComponent } from './headeradm.component';

describe('HeaderadmComponent', () => {
  let component: HeaderadmComponent;
  let fixture: ComponentFixture<HeaderadmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderadmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderadmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
