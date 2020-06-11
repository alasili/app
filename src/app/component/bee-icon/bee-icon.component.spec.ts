import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeeIconComponent } from './bee-icon.component';

describe('BeeIconComponent', () => {
  let component: BeeIconComponent;
  let fixture: ComponentFixture<BeeIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeeIconComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
