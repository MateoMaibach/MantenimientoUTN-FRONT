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
  errorMessage: string = ''; 
  successMessage: string = ''; 

  constructor(private registerService: RegisterService) {}

  register() {
    if (!this.role) {
      this.errorMessage = 'Por favor, selecciona un rol.'; 
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
        this.successMessage = 'Usuario registrado con éxito.'; 
        this.errorMessage = ''; 
      },
      error => {
        console.error('Error en el registro', error);
        this.errorMessage = 'Error al registrar usuario. Intente de nuevo.'; 
      }
    );
  }
}
