import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent {

  product!: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ){
    
  }

  ngOnInit(): void {
      const idString = this.route.snapshot.paramMap.get('id') as string
      const id = +idString;
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    })    
  }

  deleteProduct(): void{
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showMessage('Produto excluído com sucesso!')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

} 
