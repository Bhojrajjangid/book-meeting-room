/*
24th Nov, 2024
TOTAL: 5 SUCCESS

=============================== Coverage summary ===============================
Statements   : 100%
Branches     : 100%
Functions    : 100%
Lines        : 100%
================================================================================
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let removeItemSpy: jasmine.Spy;
  let getItemSpy: jasmine.Spy;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    removeItemSpy = spyOn(localStorage, 'removeItem');
    getItemSpy = spyOn(localStorage, 'getItem');
    navigateSpy = spyOn(router, 'navigate');
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn to true when localStorage has "isLoggedIn" key', () => {
    getItemSpy.and.returnValue('true');
    component.ngOnInit();
    expect(component.isLoggedIn).toBe(true);
  });

  it('should set isLoggedIn to false when localStorage has no "isLoggedIn" key', () => {
    getItemSpy.and.returnValue(null);
    component.ngOnInit();
    expect(component.isLoggedIn).toBe(false);
  });

  it('should call checkLoginStatus in ngDoCheck', () => {
    spyOn(component, 'checkLoginStatus');
    component.ngDoCheck();
    expect(component.checkLoginStatus).toHaveBeenCalled();
  });

  it('should call logout and remove "isLoggedIn" from localStorage and navigate to login', () => {
    component.logout();
    expect(removeItemSpy).toHaveBeenCalledWith('isLoggedIn');
    expect(component.isLoggedIn).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
