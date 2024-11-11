import { Component, OnInit } from '@angular/core';
import { EdificioService } from '../../services/edificio.service';
import { ActivoService } from '../../services/activo.service';
import { TareaService } from '../../services/tarea.service';
import { SectorService } from '../../services/sector.service';
import { PisoService } from '../../services/piso.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { OperariosService } from '../../services/operarios.service';
import { OrdentrabajoService, OrdenTrabajo } from '../../services/ordentrabajo.service';
import { HttpClient } from '@angular/common/http';

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
  selectedGrupo: any;
  selectedSector: any;
  selectedPiso: any;
  selectedUbicacion: any;
  selectedOperario: any;
  tareasSeleccionadas: any[] = [];
  selectedFecha: string = '';
  observaciones: string = '';

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
  ) {}

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

  cargarOrdenTrabajo() {
    const ordenTrabajo: OrdenTrabajo = {
      fecha: this.selectedFecha,
      observacion: this.observaciones || '',
      edificio_nombre: this.selectedEdificio,
      tarea_descripcion: 'Grupo de tareas', // Descripción general del grupo de tareas
      sector_nombre: this.selectedSector,
      piso_nombre: this.selectedPiso,
      ubicacion_descripcion: this.selectedUbicacion,
      operario_username: this.selectedOperario,
      tipo_activo: this.selectedActivo,
      tareas: JSON.stringify(this.tareasSeleccionadas.map(tarea => tarea.descripcion)) // Convertir tareas a JSON como string
    };

    this.ordentrabajoService.createOrdenTrabajo(ordenTrabajo).subscribe(
      response => {
        console.log('Orden de trabajo guardada exitosamente:', response);
        alert('Orden de trabajo guardada exitosamente.');
      },
      error => {
        console.error('Error al guardar la orden de trabajo:', error);
        alert('Hubo un error al guardar la orden de trabajo. Por favor, revisa los datos e inténtalo nuevamente.');
      }
    );
  }
}
