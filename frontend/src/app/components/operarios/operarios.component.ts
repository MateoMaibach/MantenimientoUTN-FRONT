import { Component, OnInit } from '@angular/core';
import { OperariosService } from '../../services/operarios.service';
import { Operario } from '../../models/operario.model'; // Importar la interfaz

@Component({
  selector: 'app-operarios',
  templateUrl: './operarios.component.html',
  styleUrls: ['./operarios.component.css']
})
export class OperariosComponent implements OnInit {
  operarios: Operario[] = []; // Cambiar a tipo Operario[]

  constructor(private operariosService: OperariosService) {}

  ngOnInit(): void {
    this.operariosService.getOperarios().subscribe((data: Operario[]) => {
      this.operarios = data; // Data tipada como Operario[]
    });
  }
}


