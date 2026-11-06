import { Component } from '@angular/core';
import { InventarioComponent } from './inventario.component';

@Component({
  imports: [InventarioComponent],
  selector: 'app-root',
  template: `
    <app-inventario />
  `,
})
export class App {}
