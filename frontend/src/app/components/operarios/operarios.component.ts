// src/app/components/tareas-operario/tareas-operario.component.ts
import { Component, OnInit } from '@angular/core';
import { OrdentrabajoService, OrdenTrabajo } from '../../services/ordentrabajo.service';
import { OperariosService } from '../../services/operarios.service';
import { Operario } from '../../models/operario.model';


@Component({
  selector: 'app-operarios',
  templateUrl: './operarios.component.html',
  styleUrls: ['./operarios.component.css']
})
export class TareasOperarioComponent implements OnInit {
  ordenesTrabajo: OrdenTrabajo[] = [];
  operarios: Operario[] = [];  // Lista de operarios obtenida desde la base de datos
  operarioSeleccionado: string = '';
  ordenTrabajoSeleccionada: OrdenTrabajo | null = null;  // Para almacenar la orden seleccionada y mostrarla completa

  constructor(
    private ordentrabajoService: OrdentrabajoService,
    private operariosService: OperariosService
  ) {}

  ngOnInit(): void {
    this.cargarOperarios();  // Cargar la lista de operarios al iniciar el componente
  }

  // Método para cargar los operarios desde el backend
  cargarOperarios(): void {
    this.operariosService.getOperarios().subscribe(
      (operarios) => {
        this.operarios = operarios;
      },
      (error) => {
        console.error('Error al cargar los operarios', error);
      }
    );
  }

  // Método para cargar las tareas del operario seleccionado
  cargarOrdenesDelOperario(): void {
    if (this.operarioSeleccionado) {
      this.ordentrabajoService.getOrdenesPorOperario(this.operarioSeleccionado).subscribe(
        (ordenes) => {
          this.ordenesTrabajo = ordenes;
        },
        (error) => {
          console.error('Error al cargar las órdenes de trabajo', error);
        }
      );
    } else {
      this.ordenesTrabajo = [];
    }
  }

  // Método para seleccionar una orden de trabajo y mostrarla completa
  mostrarOrdenCompleta(orden: OrdenTrabajo): void {
    this.ordenTrabajoSeleccionada = orden;  // Almacena la orden seleccionada
  }

  // Método para cerrar la vista de la orden completa
  cerrarOrdenCompleta(): void {
    this.ordenTrabajoSeleccionada = null;  // Limpiar la orden seleccionada
  }
}
