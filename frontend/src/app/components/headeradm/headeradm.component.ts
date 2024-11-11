import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-headeradm',
  templateUrl: './headeradm.component.html',
  styleUrls: ['./headeradm.component.css']
})
export class HeaderadmComponent implements AfterViewInit {
  @ViewChild('gearButton') gearButton!: ElementRef; 
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef; 
  @ViewChild('userButton') userButton!: ElementRef; 

  opciones = [
    { id_opcion: 1, descripcion: 'Cerrar sesión' }
  ];

  userName: string = 'Nombre de Usuario'; 
  tooltipVisible: boolean = false; 

  constructor(private router: Router, private cookieService: CookieService) {}

  ngAfterViewInit(): void {
    this.configureGearButton();
    this.configureUserButton();
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  private configureGearButton(): void {
    this.gearButton.nativeElement.addEventListener('click', (event: Event) => {
      event.stopPropagation();
      this.dropdownMenu.nativeElement.classList.toggle('show');
    });
  }

  private configureUserButton(): void {
    this.userButton.nativeElement.addEventListener('mouseenter', () => {
      this.tooltipVisible = true;
    });

    this.userButton.nativeElement.addEventListener('mouseleave', () => {
      this.tooltipVisible = false;
    });
  }

  private onDocumentClick(event: Event): void {
    const isClickInside = this.gearButton.nativeElement.contains(event.target) ||
                          this.dropdownMenu.nativeElement.contains(event.target) ||
                          this.userButton.nativeElement.contains(event.target);

    if (!isClickInside) {
      this.dropdownMenu.nativeElement.classList.remove('show');
    }
  }

  onOptionSelect(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    if (selectedValue === '1') {
      this.cookieService.delete('token');
      this.router.navigate(['/login']);
    }
  }
}