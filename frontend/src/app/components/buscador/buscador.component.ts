import { Component, OnInit } from '@angular/core';
import { EdificioService } from '../../services/edificio.service';
import { ActivoService } from '../../services/activo.service';
import { SectorService } from '../../services/sector.service';
import { PisoService } from '../../services/piso.service';
import { UbicacionService } from '../../services/ubicacion.service';

interface SelectedValues {
  [key: string]: string;
  activo: string;
  edificio: string;
  sector: string;
  ubicacion: string;
  piso: string;
}

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  tableData: any[] = [];
  activos: any[] = [];
  edificios: any[] = [];
  sectores: any[] = [];
  pisos: any[] = [];
  ubicaciones: any[] = [];

  selectedValues: SelectedValues = {
    activo: '',
    edificio: '',
    sector: '',
    ubicacion: '',
    piso: ''
  };

  constructor(
    private edificioService: EdificioService,
    private activoService: ActivoService,
    private sectorService: SectorService,
    private pisoService: PisoService,
    private ubicacionService: UbicacionService
  ) { }

  ngOnInit(): void {
    
    this.cargarEdificios();
    this.cargarActivos();
    this.cargarSectores();
    this.cargarPisos();
    this.cargarUbicaciones();
  }

  combinarDatos() {
    const maxLength = Math.max(
      this.activos.length,
      this.edificios.length,
      this.sectores.length,
      this.ubicaciones.length,
      this.pisos.length
    );

    this.tableData = Array.from({ length: maxLength }, (_, i) => ({
      activo: this.activos[i] || { tipo_activo: 'N/A' },
      edificio: this.edificios[i] || { nombre: 'N/A' },
      sector: this.sectores[i] || { nombre: 'N/A' },
      ubicacion: this.ubicaciones[i] || { descripcion: 'N/A' },
      piso: this.pisos[i] || { nombre: 'N/A' }
    }));
  }

  cargarEdificios(): void {
    this.edificioService.getEdificio().subscribe(
      (data: any[]) => {
        this.edificios = data;
        this.combinarDatos();
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
        this.combinarDatos();
      },
      error => {
        console.error('Error al obtener los activos:', error);
      }
    );
  }

  cargarSectores(): void {
    this.sectorService.getSector().subscribe(
      (data: any[]) => {
        this.sectores = data;
        this.combinarDatos();
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
        this.combinarDatos();
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
        this.combinarDatos();
      },
      error => {
        console.error('Error al obtener las ubicaciones:', error);
      }
    );
  }

  agregarElemento(item: string): void {
    const valor = this.selectedValues[item.toLowerCase()];
    if (!valor) {
        alert('Por favor, ingrese un valor antes de agregar.');
        return;
    }

    let nuevoElemento: any;
    switch (item) {
        case 'ACTIVO':
            nuevoElemento = { tipo_activo: valor }; 
            this.activoService.addActivo(nuevoElemento).subscribe(() => this.cargarActivos());
            break;
        case 'EDIFICIO':
            nuevoElemento = { nombre: valor };
            this.edificioService.addEdificio(nuevoElemento).subscribe(() => this.cargarEdificios());
            break;
        case 'SECTOR':
            nuevoElemento = { nombre: valor };
            this.sectorService.addSector(nuevoElemento).subscribe(() => this.cargarSectores());
            break;
        case 'UBICACION':
            nuevoElemento = { descripcion: valor };
            this.ubicacionService.addUbicacion(nuevoElemento).subscribe(() => this.cargarUbicaciones());
            break;
        case 'PISO':
            nuevoElemento = { nombre: valor };
            this.pisoService.addPiso(nuevoElemento).subscribe(() => this.cargarPisos());
            break;
    }

    this.selectedValues[item.toLowerCase()] = '';
}

eliminarElemento(item: string): void {
    const valor = this.selectedValues[item.toLowerCase()];
    if (!valor) {
        alert('Por favor, ingrese un valor antes de eliminar.');
        return;
    }

    switch (item) {
        case 'ACTIVO':
            this.activoService.deleteActivo(valor).subscribe(() => this.cargarActivos()); 
            break;
        case 'EDIFICIO':
            this.edificioService.deleteEdificio(valor).subscribe(() => this.cargarEdificios());
            break;
        case 'SECTOR':
            this.sectorService.deleteSector(valor).subscribe(() => this.cargarSectores());
            break;
        case 'UBICACION':
            this.ubicacionService.deleteUbicacion(valor).subscribe(() => this.cargarUbicaciones());
            break;
        case 'PISO':
            this.pisoService.deletePiso(valor).subscribe(() => this.cargarPisos());
            break;
    }

    this.selectedValues[item.toLowerCase()] = '';
}

}
