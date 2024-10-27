import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login exitoso', response);

        // Guardar el token en la cookie ya se realiza en el AuthService

        // Obtener el rol del usuario del token
        const userRole = this.authService.getUserRole();
        console.log('Rol del usuario:', userRole);

        // Redirigir según el rol del usuario
        if (userRole === 'admin') {
          this.router.navigate(['/dashboard']);  // Redirige al admin al dashboard
        } else if (userRole === 'operario') {
          this.router.navigate(['/dashboard-op']); // Redirige al operario al dashboard-op
        } else {
          this.errorMessage = 'Rol no reconocido.';
        }
      },
      error => {
        console.error('Error en el login', error);
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      }
    );
  }
}
