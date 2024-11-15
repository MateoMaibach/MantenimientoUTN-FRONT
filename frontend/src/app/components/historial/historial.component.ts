import { Component, OnInit } from '@angular/core';
import { OrdentrabajoService } from '../../services/ordentrabajo.service';
import { OperariosService } from '../../services/operarios.service';
import { Operario } from '../../models/operario.model';
import { ActivoService } from '../../services/activo.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  ordenesTrabajo: any[] = []; 
  ordenSeleccionada: any = null; 
  operarioSeleccionado: string = ''; 
  operarios: Operario[] = [];  
  activos: any[] = []; 
  activoSeleccionado: string = ''; 

  constructor(
    private ordentrabajoService: OrdentrabajoService,
    private operariosService: OperariosService,
    private activoService: ActivoService
  ) {}

  ngOnInit(): void {
    this.cargarTodasLasOrdenes(); 
    this.cargarOperarios(); 
    this.cargarActivos(); 
  }

  
  generarPDF(): void {
    const doc = new jsPDF();
  
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);  
    
    
    doc.setFontSize(18);
    doc.setTextColor(33, 150, 243);  
    doc.text('Detalles de la Orden de Trabajo', 10, 10);
  

    if (this.ordenSeleccionada) {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); 
  
     
      doc.text(`Orden de Trabajo N°: ${this.ordenSeleccionada.OT_num}`, 10, 20);
      doc.text(`Fecha: ${this.ordenSeleccionada.fecha}`, 10, 30);
      doc.text(`Activo: ${this.ordenSeleccionada.tipo_activo}`, 10, 40);
      doc.text(`Código único: ${this.ordenSeleccionada.codigo_unico}`, 10, 50);
      doc.text(`Operario: ${this.ordenSeleccionada.operario_username}`, 10, 60);
      doc.text(`Edificio: ${this.ordenSeleccionada.edificio_nombre}`, 10, 70);
      
      
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(10, 75, 200, 75);
  
      
      doc.setFontSize(12);
      doc.text('Tareas Asignadas:', 10, 85);
      const tareas = this.ordenSeleccionada.tareas.split(',').map((tarea: string) => tarea.trim());
      tareas.forEach((tarea: any, index: number) => {
        doc.text(`${index + 1}. ${tarea}`, 10, 95 + (index * 10));
      });
  
 
      const observaciones = this.ordenSeleccionada.observacion ? this.ordenSeleccionada.observacion : 'No hay observaciones';
      doc.text(`Observaciones:`, 10, 105 + (tareas.length * 10));
      doc.text(observaciones, 10, 115 + (tareas.length * 10));
  

      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);  
      doc.text('Generado por Mantenimiento UTN', 10, doc.internal.pageSize.height - 10);
  
      
      doc.save(`orden_trabajo_${this.ordenSeleccionada.OT_num}.pdf`);
    }
  }

  
  cargarTodasLasOrdenes(): void {
    this.ordentrabajoService.getOrdenesTrabajo().subscribe(
      (ordenes) => {
        this.ordenesTrabajo = ordenes; 
      },
      (error) => {
        console.error('Error al cargar todas las órdenes de trabajo', error);
      }
    );
  }

  
  cargarOrdenes(): void {
    this.ordenesTrabajo = []; 

    if (this.operarioSeleccionado) {
      this.ordentrabajoService.getOrdenesPorOperario(this.operarioSeleccionado).subscribe(
        (ordenes) => {
          this.ordenesTrabajo = ordenes;
          console.log('Órdenes de trabajo por operario:', ordenes); 
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
          console.log('Órdenes de trabajo por activo:', ordenes); 
        },
        (error) => {
          console.error('Error al cargar las órdenes de trabajo por activo', error);
        }
      );
    }
  }


  limpiarFiltros(): void {
    this.operarioSeleccionado = ''; 
    this.activoSeleccionado = ''; 
    this.cargarTodasLasOrdenes(); 
  }


  verDetalles(orden: any): void {
    this.ordenSeleccionada = orden;
  }


  eliminarOrden(id_orden: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta orden de trabajo?');
    if (confirmacion) {
      this.ordentrabajoService.eliminarOrden(id_orden).subscribe({
        next: () => {
          alert('Orden de trabajo eliminada correctamente');
          this.ordenSeleccionada = null; 
          this.cargarTodasLasOrdenes(); 
        },
        error: (error) => {
          console.error('Error al eliminar la orden de trabajo:', error);
          alert('Ocurrió un error al intentar eliminar la orden de trabajo');
        }
      });
    }
  }

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
