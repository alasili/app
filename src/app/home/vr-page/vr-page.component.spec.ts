import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VrPageComponent } from './vr-page.component';

describe('VrPageComponent', () => {
  let component: VrPageComponent;
  let fixture: ComponentFixture<VrPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
