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
import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [RouterTestingModule],
            providers: [
                FormBuilder,
                { provide: Router, useValue: routerSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        fixture.detectChanges();
    });

    it('should create the login component', () => {
        expect(component).toBeTruthy();
    });

    it('should log in successfully and navigate to book-room', () => {
        component.loginForm.setValue({
            username: 'ADMIN',
            password: 'Password123',
        });
        component.onLogin();
        expect(localStorage.getItem('isLoggedIn')).toBe('true');
        expect(router.navigate).toHaveBeenCalledWith(['/book-room']);
    });

    it('should show an alert for invalid credentials', () => {
        spyOn(window, 'alert');
        component.loginForm.setValue({
            username: 'wrongUser',
            password: 'wrongPassword',
        });
        component.onLogin();
        expect(window.alert).toHaveBeenCalledWith('Invalid Username or Password');
    });

    it('should show an alert when form is invalid', () => {
        spyOn(window, 'alert');
        component.loginForm.setValue({
            username: '',
            password: 'Password123',
        });
        component.onLogin();
        expect(window.alert).toHaveBeenCalledWith('Please fill out all fields correctly.');
    });

    it('should not call navigate if the form is invalid', () => {
        component.loginForm.setValue({
            username: '',
            password: 'Password123',
        });
        component.onLogin();
        expect(router.navigate).not.toHaveBeenCalled();
    });

});