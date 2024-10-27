import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  username: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string = ''; // Para manejar errores
  successMessage: string = ''; // Para mostrar mensajes de éxito

  constructor(private registerService: RegisterService) {}

  register() {
    if (!this.role) {
      this.errorMessage = 'Por favor, selecciona un rol.'; // Mensaje de error si no hay rol
      return;
    }

    const user = {
      username: this.username,
      password: this.password,
      role: this.role
    };

    this.registerService.register(user).subscribe(
      response => {
        console.log('Registro exitoso', response);
        this.successMessage = 'Usuario registrado con éxito.'; // Mensaje de éxito
        this.errorMessage = ''; // Limpiar mensajes de error
      },
      error => {
        console.error('Error en el registro', error);
        this.errorMessage = 'Error al registrar usuario. Intente de nuevo.'; // Mensaje de error
      }
    );
  }
}
