import { Component, OnInit } from '@angular/core';
import { OrdentrabajoService, OrdenTrabajo } from '../../services/ordentrabajo.service';
import { AuthService } from '../../services/login.service'; // Inyectar el servicio de autenticación

@Component({
  selector: 'app-operarios',
  templateUrl: './operarios.component.html',
  styleUrls: ['./operarios.component.css']
})
export class TareasOperarioComponent implements OnInit {
  ordenesTrabajo: OrdenTrabajo[] = [];
  operarioSeleccionado: string = ''; // Almacenar el nombre del operario
  ordenTrabajoSeleccionada: OrdenTrabajo | null = null; // Almacenar la orden seleccionada
  usuarioAutenticado: any = null; // Almacenar los datos del usuario autenticado

  constructor(
    private ordentrabajoService: OrdentrabajoService,
    private authService: AuthService // Inyectar el servicio de autenticación
  ) {}

  ngOnInit(): void {
    // Obtener el operario autenticado
    this.usuarioAutenticado = this.authService.getCurrentUser();
    if (this.usuarioAutenticado && this.usuarioAutenticado !== null) {
      this.operarioSeleccionado = this.usuarioAutenticado; // Usar el username del operario autenticado
      this.cargarOrdenesDelOperario(); // Cargar las órdenes de trabajo para ese operario
    } else {
      // Si no hay operario autenticado, mostrar todas las órdenes
      this.cargarTodasLasOrdenes();
    }
  }

  // Método para cargar las órdenes de trabajo del operario autenticado
  cargarOrdenesDelOperario(): void {
    this.ordentrabajoService.getOrdenesPorOperario(this.operarioSeleccionado).subscribe(
      (ordenes: OrdenTrabajo[]) => {
        this.ordenesTrabajo = ordenes;
      },
      (error: any) => {
        console.error('Error al cargar las órdenes de trabajo', error);
      }
    );
  }

  // Método para cargar todas las órdenes de trabajo (por si no hay operario autenticado)
  cargarTodasLasOrdenes(): void {
    this.ordentrabajoService.getOrdenesTrabajo().subscribe(
      (ordenes: OrdenTrabajo[]) => {
        this.ordenesTrabajo = ordenes;
      },
      (error: any) => {
        console.error('Error al cargar todas las órdenes de trabajo', error);
      }
    );
  }

  // Método para seleccionar una orden de trabajo y mostrarla completa
  mostrarOrdenCompleta(orden: OrdenTrabajo): void {
    this.ordenTrabajoSeleccionada = orden;  // Almacenar la orden seleccionada
  }

  // Método para cerrar la vista de la orden completa
  cerrarOrdenCompleta(): void {
    this.ordenTrabajoSeleccionada = null;  // Limpiar la orden seleccionada
  }
}
