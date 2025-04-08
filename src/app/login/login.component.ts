import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent {
  users: any[] = [];
  credentials = { username: '', password: '' };
  errorMessage = '';
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('assets/users.json').subscribe(
      users => {
        console.log('Usuarios cargados:', users);
        this.users = users;
      },
      error => console.error('Error:', error)
    );
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    
    this.isLoading = true;
    this.errorMessage = '';

    setTimeout(() => {
      const user = this.users.find(u => 
        u.username === this.credentials.username && 
        u.password === this.credentials.password
      );

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
      this.isLoading = false;
    }, 800);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}