import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeeListComponent } from './bee-list.component';

describe('BeeListComponent', () => {
  let component: BeeListComponent;
  let fixture: ComponentFixture<BeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeeListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
