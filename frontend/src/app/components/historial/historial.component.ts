import { Component, OnInit } from '@angular/core';
import { OrdentrabajoService } from '../../services/ordentrabajo.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  // Variable para almacenar las órdenes de trabajo
  ordenesTrabajo: any[] = [];

  // Inyectamos el servicio en el constructor
  constructor(private ordentrabajoService: OrdentrabajoService) {}

  // Método que se ejecuta al cargar el componente
  ngOnInit(): void {
    // Llamamos al servicio para obtener las órdenes de trabajo
    this.ordentrabajoService.getOrdenesTrabajo().subscribe({
      next: (response) => {
        this.ordenesTrabajo = response;
        console.log('Órdenes de trabajo obtenidas:', response); // Solo para depuración
      },
      error: (error) => {
        console.error('Error al obtener órdenes de trabajo:', error); // En caso de error
      }
    });
  }
}
