import { Component, OnInit } from '@angular/core';
import { EdificioService } from '../../services/edificio.service';
import { ActivoService } from '../../services/activo.service';
import { TareaService } from '../../services/tarea.service';
import { SectorService } from '../../services/sector.service';
import { PisoService } from '../../services/piso.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { OperariosService } from '../../services/operarios.service';

import { jsPDF } from 'jspdf';
import html2canvas  from 'html2canvas';

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

  selectedEdificio: any = null;
  selectedActivo: any = null;
  selectedTarea: any = null;
  selectedSector: any = null ;
  selectedPiso: any = null ;
  selectedUbicacion: any = null;
  selectedOperario: any = null;

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
    const elementToPrint = document.getElementById('contenidoPDF');
  
    if (!elementToPrint) {
      console.error('No se encontró el elemento contenidoPDF.');
      return;
    }
  
    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 vertical
      const imageData = canvas.toDataURL('image/png');
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
  
      // Ajuste de escala para ocupar un 95% de la altura de la hoja
      const scale = Math.min((pdfWidth * 1) / imgWidth, (pdfHeight * 1) / imgHeight);
      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;
  
      // Ajuste de la posición horizontal (desplazado hacia la derecha)
      const xOffset = 5;
      const x = (pdfWidth - scaledWidth) / 2 + xOffset;
      
      // Ajuste vertical centrado
      const y = (pdfHeight - scaledHeight) / 2;
  
      pdf.addImage(imageData, 'PNG', x, y, scaledWidth, scaledHeight);
      pdf.setFontSize(12);
      pdf.save('OrdenTrabajo.pdf');
    });
  }
  
  
  
  
  

  // Método para imprimir el formulario
  printForm() {
    const printContents = document.querySelector('.formularioOrdenTrabajo') as HTMLElement;
    const iframe = document.createElement('iframe');
    
    // Estilo del iframe
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
