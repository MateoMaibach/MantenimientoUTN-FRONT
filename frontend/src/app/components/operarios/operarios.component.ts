import { Component, OnInit } from '@angular/core';
import { OperariosService } from '../../services/operarios.service';

@Component({
  selector: 'app-operarios',
  templateUrl: './operarios.component.html',
  styleUrls: ['./operarios.component.css'],
})
export class OperariosComponent implements OnInit {
  operarios: any[] = [];

  constructor(private OperariosService: OperariosService) {}

  ngOnInit(): void {
    this.OperariosService.getOperarios().subscribe((data) => {
      this.operarios = data;
    });
  }
}

