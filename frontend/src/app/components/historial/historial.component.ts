import { Component, OnInit } from '@angular/core';
import { OrdentrabajoService } from '../../services/ordentrabajo.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  ordenesTrabajo: any[] = []; // Variable para almacenar las órdenes
  ordenSeleccionada: any = null; // Para almacenar la orden seleccionada

  constructor(private ordentrabajoService: OrdentrabajoService) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  // Método para cargar todas las órdenes de trabajo
  cargarOrdenes(): void {
    this.ordentrabajoService.getOrdenesTrabajo().subscribe({
      next: (response) => {
        this.ordenesTrabajo = response;
        console.log('Órdenes de trabajo obtenidas:', response);
      },
      error: (error) => {
        console.error('Error al obtener órdenes de trabajo:', error);
      }
    });
  }

  // Método para ver el historial (si es necesario, puede implementar lógica adicional)
  verHistorial(): void {
    console.log('Mostrando historial...');
  }

  // Método para ver los detalles de una orden
  verDetalles(orden: any): void {
    this.ordenSeleccionada = orden;
  }

  // Método para eliminar una orden de trabajo por ID
  eliminarOrden(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta orden de trabajo?');
    if (confirmacion) {
      this.ordentrabajoService.eliminarOrden(id).subscribe({
        next: () => {
          alert('Orden de trabajo eliminada correctamente');
          this.ordenSeleccionada = null; // Cierra el modal después de eliminar
          this.cargarOrdenes(); // Actualiza la lista de órdenes
        },
        error: (error) => {
          console.error('Error al eliminar la orden de trabajo:', error);
          alert('Ocurrió un error al intentar eliminar la orden de trabajo');
        }
      });
    }
  }
}
