import { Component, computed, effect, signal } from '@angular/core';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

@Component({
  selector: 'app-inventario',
  standalone: true,
  templateUrl: './inventario.component.html',
})
export class InventarioComponent {
  readonly productos = signal<Producto[]>([
    { id: 1, nombre: 'Teclado', precio: 45, stock: 12 },
    { id: 2, nombre: 'Mouse', precio: 25, stock: 20 },
    { id: 3, nombre: 'Monitor', precio: 220, stock: 8 },
  ]);

  readonly filtro = signal('');

  readonly productosFiltrados = computed(() => {
    const texto = this.filtro().trim().toLowerCase();
    return this.productos().filter((producto) =>
      producto.nombre.toLowerCase().includes(texto),
    );
  });

  readonly valorTotalInventario = computed(() =>
    this.productos().reduce(
      (total, producto) => total + producto.precio * producto.stock,
      0,
    ),
  );

  constructor() {
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'cantidadProductosInventario',
          String(this.productos().length),
        );
      }
    });
  }

  reducirStock(id: number): void {
    this.productos.update((productos) =>
      productos.map((producto) =>
        producto.id === id
          ? { ...producto, stock: Math.max(0, producto.stock - 1) }
          : producto,
      ),
    );
  }
}
