import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  //styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuAbierto = false

  onClickMenuHamburguesa(){
    this.menuAbierto = !this.menuAbierto
  }

  cerrarMenu(){
    this.menuAbierto = false
  }

  onHoverMenu(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return;
    this.menuAbierto = true
  }
}
