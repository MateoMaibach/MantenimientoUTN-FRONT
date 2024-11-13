import { Component, OnInit } from '@angular/core';
import { OrdentrabajoService } from '../../services/ordentrabajo.service';
import { OperariosService } from '../../services/operarios.service';
import { Operario } from '../../models/operario.model';
import { ActivoService } from '../../services/activo.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  ordenesTrabajo: any[] = []; // Lista de órdenes de trabajo
  ordenSeleccionada: any = null; // Orden seleccionada
  operarioSeleccionado: string = ''; // Operario seleccionado
  operarios: Operario[] = [];  // Lista de operarios
  activos: any[] = []; // Lista de activos
  activoSeleccionado: string = ''; // Activo seleccionado

  constructor(
    private ordentrabajoService: OrdentrabajoService,
    private operariosService: OperariosService,
    private activoService: ActivoService
  ) {}

  ngOnInit(): void {
    this.cargarTodasLasOrdenes(); // Cargar todas las órdenes cuando se inicia el componente
    this.cargarOperarios(); // Cargar lista de operarios
    this.cargarActivos(); // Cargar lista de activos
  }

  // Cargar todas las órdenes de trabajo
  cargarTodasLasOrdenes(): void {
    this.ordentrabajoService.getOrdenesTrabajo().subscribe(
      (ordenes) => {
        this.ordenesTrabajo = ordenes; // Asignar todas las órdenes a la lista
      },
      (error) => {
        console.error('Error al cargar todas las órdenes de trabajo', error);
      }
    );
  }

  // Método que se llama cuando se hace clic en el botón "Ver"
  cargarOrdenes(): void {
    this.ordenesTrabajo = []; // Limpiar las órdenes actuales

    if (this.operarioSeleccionado) {
      this.ordentrabajoService.getOrdenesPorOperario(this.operarioSeleccionado).subscribe(
        (ordenes) => {
          this.ordenesTrabajo = ordenes;
          console.log('Órdenes de trabajo por operario:', ordenes); // Depuración
          if (this.activoSeleccionado) {
            this.ordenesTrabajo = this.ordenesTrabajo.filter(orden => orden.tipo_activo === this.activoSeleccionado);
          }
        },
        (error) => {
          console.error('Error al cargar las órdenes de trabajo por operario', error);
        }
      );
    } else if (this.activoSeleccionado) {
      this.ordentrabajoService.getOrdenesTrabajoAC(this.activoSeleccionado).subscribe(
        (ordenes) => {
          this.ordenesTrabajo = ordenes;
          console.log('Órdenes de trabajo por activo:', ordenes); // Depuración
        },
        (error) => {
          console.error('Error al cargar las órdenes de trabajo por activo', error);
        }
      );
    }
  }

  // Método para limpiar los filtros
  limpiarFiltros(): void {
    this.operarioSeleccionado = ''; // Limpiar el filtro por operario
    this.activoSeleccionado = ''; // Limpiar el filtro por activo
    this.cargarTodasLasOrdenes(); // Recargar todas las órdenes de trabajo
  }

  // Método para ver detalles de una orden seleccionada
  verDetalles(orden: any): void {
    this.ordenSeleccionada = orden;
  }

  // Método para eliminar una orden de trabajo
  eliminarOrden(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta orden de trabajo?');
    if (confirmacion) {
      this.ordentrabajoService.eliminarOrden(id).subscribe({
        next: () => {
          alert('Orden de trabajo eliminada correctamente');
          this.ordenSeleccionada = null; // Cerrar el modal
          this.cargarTodasLasOrdenes(); // Volver a cargar todas las órdenes
        },
        error: (error) => {
          console.error('Error al eliminar la orden de trabajo:', error);
          alert('Ocurrió un error al intentar eliminar la orden de trabajo');
        }
      });
    }
  }

  // Cargar operarios
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

  // Cargar activos
  cargarActivos(): void {
    this.activoService.getActivo().subscribe(
      (activos) => {
        this.activos = activos;
      },
      (error) => {
        console.error('Error al obtener los activos:', error);
      }
    );
  }
}
