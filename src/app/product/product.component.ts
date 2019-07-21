import { Component, OnInit } from '@angular/core';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';
import { ProductService, Product } from '../shared/product.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Observable< Product[]>;
  private imgUrl = 'http://placehold.it/320x150';

  // private keyworld: string;
  // private titleFilter: FormControl = new FormControl();


  constructor(private productService: ProductService) {
    // this.titleFilter.valueChanges
    //   .pipe(debounceTime(500))
    //   .subscribe(
    //     value => this.keyworld = value
    // );
  }

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.productService.searchEvent.subscribe(
      params => (this.products = this.productService.search(params))
    );
  }

}

