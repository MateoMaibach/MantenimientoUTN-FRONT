import { Component, OnInit } from '@angular/core';
import { EdificioService } from '../../services/edificio.service';
import { ActivoService } from '../../services/activo.service';
import { TareaService } from '../../services/tarea.service';
import { SectorService } from '../../services/sector.service';
import { PisoService } from '../../services/piso.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { OperariosService } from '../../services/operarios.service';
import { OrdentrabajoService } from '../../services/ordentrabajo.service';
import { OrdenTrabajo } from '../../models/orden-trabajo.model';
import { HttpClient } from '@angular/common/http';
import { Edificio } from '../../models/edificio.model';
import { Activo } from '../../models/activo.model';
import { Tarea } from '../../models/tarea.model';
import { Sector } from '../../models/sector.model';
import { Piso } from '../../models/piso.model';
import { Ubicacion } from '../../models/ubicacion.model';
import { Operario } from '../../models/operario.model';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.css']
})
export class OrdenTrabajoComponent implements OnInit {
  edificios: Edificio[] = [];
  activos: Activo[] = [];
  tareas: Tarea[] = [];
  sectores: Sector[] = [];
  pisos: Piso[] = [];
  ubicaciones: Ubicacion[] = [];
  operarios: Operario[] = [];

  selectedEdificio: Edificio | null = null;
  selectedActivo: Activo | null = null;
  selectedGrupo: string | null = null;
  selectedSector: Sector | null = null;
  selectedPiso: Piso | null = null;
  selectedUbicacion: Ubicacion | null = null;
  selectedOperario: Operario | null = null;
  tareasSeleccionadas: Tarea[] = [];
  selectedFecha: string = '';
  observaciones: string = '';

  limpiarCampos() {
    this.selectedFecha = '';  
    this.selectedEdificio = null; 
    this.selectedActivo = null;
    this.selectedGrupo = null;  
    this.selectedSector = null;
    this.selectedPiso = null;
    this.selectedUbicacion = null;
    this.selectedOperario = null;
    this.tareasSeleccionadas = [];  
  }


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
      this.tareaService.getTareasPorActivoGrupo(this.selectedActivo.tipo_activo, this.selectedGrupo).subscribe(
        (data: Tarea[]) => {
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
    this.edificioService.getEdificio().subscribe(
      (data:Edificio[]) => {
        this.edificios = data;
      },
      error => {
        console.error('Error al obtener los edificios:', error);
      }
    );
  }

  cargarActivos(): void {
    this.activoService.getActivo().subscribe(
      (data: Activo[]) => {
        this.activos = data;
      },
      error => {
        console.error('Error al obtener los activos:', error);
      }
    );
  }

  cargarTareas(): void {
    this.tareaService.getTareas().subscribe(
      (data: Tarea[]) => {
        this.tareas = data;
      },
      error => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }

  cargarSectores(): void {
    this.sectorService.getSector().subscribe(
      (data: Sector[]) => {
        this.sectores = data;
      },
      error => {
        console.error('Error al obtener los sectores:', error);
      }
    );
  }

  cargarPisos(): void {
    this.pisoService.getPiso().subscribe(
      (data: Piso[]) => {
        this.pisos = data;
      },
      error => {
        console.error('Error al obtener los pisos:', error);
      }
    );
  }

  cargarUbicaciones(): void {
    this.ubicacionService.getUbicacion().subscribe(
      (data: Ubicacion[]) => {
        this.ubicaciones = data;
      },
      error => {
        console.error('Error al obtener las ubicaciones:', error);
      }
    );
  }

  cargarOperarios(): void {
    this.operariosService.getOperarios().subscribe(
      (data: Operario[]) => {
        this.operarios = data;
      },
      error => {
        console.error('Error al obtener los operarios:', error);
      }
    );
  }

  cargarOrdenTrabajo() {
    if (!this.selectedEdificio || !this.selectedActivo || !this.selectedSector || !this.selectedPiso || !this.selectedUbicacion || !this.selectedOperario) {
      alert("Todos los campos deben estar seleccionados.");
      return;
    }

    const ordenTrabajo: OrdenTrabajo = {
      fecha: this.selectedFecha,
      observacion: this.observaciones ,
      edificio_nombre: this.selectedEdificio.nombre,
      tarea_descripcion: 'Grupo de tareas', 
      sector_nombre: this.selectedSector.nombre,
      piso_nombre: this.selectedPiso.nombre,
      ubicacion_descripcion: this.selectedUbicacion.descripcion,
      operario_username: this.selectedOperario.username,
      tipo_activo: this.selectedActivo.tipo_activo,
      tareas: JSON.stringify(this.tareasSeleccionadas.map(tarea => tarea.descripcion)) 
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
