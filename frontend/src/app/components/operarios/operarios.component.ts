import { Component, OnInit } from '@angular/core';
import { OrdentrabajoService, OrdenTrabajo } from '../../services/ordentrabajo.service';
import { AuthService } from '../../services/login.service'; 

@Component({
  selector: 'app-operarios',
  templateUrl: './operarios.component.html',
  styleUrls: ['./operarios.component.css']
})
export class TareasOperarioComponent implements OnInit {
  ordenesTrabajo: OrdenTrabajo[] = [];
  operarioSeleccionado: string = ''; 
  ordenTrabajoSeleccionada: OrdenTrabajo | null = null; 
  usuarioAutenticado: any = null; 

  constructor(
    private ordentrabajoService: OrdentrabajoService,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    
    this.usuarioAutenticado = this.authService.getCurrentUser();
    if (this.usuarioAutenticado && this.usuarioAutenticado !== null) {
      this.operarioSeleccionado = this.usuarioAutenticado; 
      this.cargarOrdenesDelOperario(); 
    } else {
      
      this.cargarTodasLasOrdenes();
    }
  }

  
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

  
  mostrarOrdenCompleta(orden: OrdenTrabajo): void {
    this.ordenTrabajoSeleccionada = orden;  
  }

  
  cerrarOrdenCompleta(): void {
    this.ordenTrabajoSeleccionada = null;  
  }
}
