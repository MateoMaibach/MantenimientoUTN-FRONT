import { Component, OnInit } from '@angular/core';
import { EdificioService } from '../../services/edificio.service';
import { ActivoService } from '../../services/activo.service';
import { TareaService } from '../../services/tarea.service';
import { SectorService } from '../../services/sector.service';
import { PisoService } from '../../services/piso.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { OperariosService } from '../../services/operarios.service';
import { HttpClient } from '@angular/common/http';
import { OrdentrabajoService } from '../../services/ordentrabajo.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.css']
})
export class OrdenTrabajoComponent implements OnInit {

  // Listas para los datos de selección
  edificios: any[] = [];
  activos: any[] = [];
  tareas: any[] = [];
  sectores: any[] = [];
  pisos: any[] = [];
  ubicaciones: any[] = [];
  operarios: any[] = [];

  // Variables para los valores seleccionados en el formulario
  selectedEdificio: any;
  selectedActivo: any;
  selectedGrupo: any;
  selectedSector: any;
  selectedPiso: any;
  selectedUbicacion: any;
  selectedOperario: any;
  tareasSeleccionadas: any[] = [];
  selectedFecha: string = '';
  observaciones: string = '';
  selectedTarea: any;

  constructor(
    private edificioService: EdificioService,
    private activoService: ActivoService,
    private tareaService: TareaService,
    private sectorService: SectorService,
    private pisoService: PisoService,
    private ubicacionService: UbicacionService,
    private operariosService: OperariosService,
    private ordentrabajoService: OrdentrabajoService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.cargarEdificios();
    this.cargarActivos();
    this.cargarTareas();
    this.cargarSectores();
    this.cargarPisos();
    this.cargarUbicaciones();
    this.cargarOperarios();
    this.cargarOrdenTrabajo()
  }

  // Método para buscar tareas según el activo y grupo seleccionados
  buscarTareas() {
    if (this.selectedActivo && this.selectedGrupo) {
      this.tareaService.getTareasPorActivoGrupo(this.selectedActivo, this.selectedGrupo).subscribe(
        (data: any) => {
          this.tareasSeleccionadas = data;
          console.log('Tareas encontradas:', data);
        },
        (error) => {
          console.error('Error al obtener las tareas:', error);
        }
      );
    } else {
      this.tareasSeleccionadas = [];
    }
  }

  cargarEdificios(): void {
    this.edificioService.GetEdificio().subscribe(
      (data: any[]) => {
        this.edificios = data;
      },
      error => {
        console.error('Error al obtener los edificios:', error);
      }
    );
  }

  cargarActivos(): void {
    this.activoService.getActivo().subscribe(
      (data: any[]) => {
        this.activos = data;
      },
      error => {
        console.error('Error al obtener los activos:', error);
      }
    );
  }

  cargarTareas(): void {
    this.tareaService.getTarea().subscribe(
      (data: any[]) => {
        this.tareas = data;
      },
      error => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }

  cargarSectores(): void {
    this.sectorService.getSector().subscribe(
      (data: any[]) => {
        this.sectores = data;
      },
      error => {
        console.error('Error al obtener los sectores:', error);
      }
    );
  }

  cargarPisos(): void {
    this.pisoService.getPiso().subscribe(
      (data: any[]) => {
        this.pisos = data;
      },
      error => {
        console.error('Error al obtener los pisos:', error);
      }
    );
  }

  cargarUbicaciones(): void {
    this.ubicacionService.getUbicacion().subscribe(
      (data: any[]) => {
        this.ubicaciones = data;
      },
      error => {
        console.error('Error al obtener las ubicaciones:', error);
      }
    );
  }

  cargarOperarios(): void {
    this.operariosService.getOperarios().subscribe(
      (data: any[]) => {
        this.operarios = data;
      },
      error => {
        console.error('Error al obtener los operarios:', error);
      }
    );
  }

  // Método para cargar y guardar la orden de trabajo
  cargarOrdenTrabajo() {
    const ordenTrabajo = {
      fecha: this.selectedFecha,
      observacion: this.observaciones || '',
      edificio_nombre: this.selectedEdificio,
      tarea_descripcion:'Relevar marca.',
      sector_nombre: this.selectedSector,
      piso_nombre: this.selectedPiso,
      ubicacion_descripcion: this.selectedUbicacion,
      operario_username: this.selectedOperario,
      tipo_activo: this.selectedActivo
    };
  
    // Enviar la orden de trabajo al servicio
    this.ordentrabajoService.createOrdenTrabajo(ordenTrabajo).subscribe(
      (response) => {
        console.log('Orden de trabajo guardada exitosamente:', response);
        alert('Orden de trabajo guardada exitosamente.');
      },
      (error) => {
        console.error('Error al guardar la orden de trabajo:', error);
        alert('Hubo un error al guardar la orden de trabajo. Por favor, revisa los datos e inténtalo nuevamente.');
      }
    );
  }
  

  // Método para generar el PDF de la orden de trabajo
  generatePDF() {
    const data = document.querySelector('.formularioOrdenTrabajo') as HTMLElement;
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Orden_Trabajo.pdf');
      });
    }
  }

  // Método para imprimir la orden de trabajo
  printForm() {
    const printContents = document.querySelector('.formularioOrdenTrabajo') as HTMLElement;
    const iframe = document.createElement('iframe');
    
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);
    
    const doc = iframe.contentWindow!.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          ${printContents.innerHTML}
        </body>
      </html>
    `);
    doc.close();
    iframe.contentWindow!.focus();
    iframe.contentWindow!.print();
    document.body.removeChild(iframe);
  }
}
