import { Component, OnInit } from '@angular/core';
import { Edificio, Activo, Sector, Piso, Ubicacion, Operario, Tarea } from './enums';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.css']
})
export class OrdenTrabajoComponent implements OnInit {
  edificios: string[] = Object.values(Edificio);
  activos: string[] = Object.values(Activo);
  sectores: string[] = Object.values(Sector);
  pisos: string[] = Object.values(Piso);
  ubicaciones: string[] = Object.values(Ubicacion);
  operarios: string[] = Object.values(Operario);
  tareas: string[] = Object.values(Tarea);  // Agregar esto para las tareas

  constructor() {}

  ngOnInit(): void {
  }
}
