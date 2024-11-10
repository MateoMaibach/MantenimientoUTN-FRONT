import { Component, OnInit } from '@angular/core';
import { EdificioService } from '../../services/edificio.service';
import { ActivoService } from '../../services/activo.service';
import { TareaService } from '../../services/tarea.service';
import { SectorService } from '../../services/sector.service';
import { PisoService } from '../../services/piso.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { OperariosService } from '../../services/operarios.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.css']
})
export class OrdenTrabajoComponent implements OnInit {

  edificios: any[] = [];
  activos: any[] = [];
  tareas: any[] = [];
  sectores: any[] = [];
  pisos: any[] = [];
  ubicaciones: any[] = [];
  operarios: any[] = [];

  selectedEdificio: any;
  selectedActivo: any;
  selectedTarea: any;
  selectedSector: any;
  selectedPiso: any;
  selectedUbicacion: any;
  selectedOperario: any;
  selectedGrupo: any;
  tareasSeleccionadas: any[] = []; // Aquí se almacenarán las tareas seleccionadas

  constructor(
    private edificioService: EdificioService,
    private activoService: ActivoService,
    private tareaService: TareaService,
    private sectorService: SectorService,
    private pisoService: PisoService,
    private ubicacionService: UbicacionService,
    private operariosService: OperariosService
  ) { }

  ngOnInit(): void {
    this.cargarEdificios();
    this.cargarActivos();
    this.cargarTareas();
    this.cargarSectores();
    this.cargarPisos();
    this.cargarUbicaciones();
    this.cargarOperarios();
  }

  buscarTareas() {
    if (this.selectedActivo && this.selectedGrupo) {
      const apiUrl = `/tareas-por-activo-grupo?tipo_activo=${this.selectedActivo}&grupo=${this.selectedGrupo}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          this.tareasSeleccionadas = data;
          console.log('Tareas encontradas:', data);
        })
        .catch(error => console.error('Error al buscar tareas:', error));
    } else {
      this.tareasSeleccionadas = []; // Si no hay selección válida, limpiamos las tareas
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

  generatePDF() {
    const data = document.querySelector('.formularioOrdenTrabajo') as HTMLElement;

    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Orden_Trabajo.pdf');
      });
    }
  }

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
            /* Aquí puedes añadir más estilos para el formulario si es necesario */
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
