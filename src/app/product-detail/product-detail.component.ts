import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product, ProductService, Comment } from '../shared/product.service';
import { TouchSequence } from 'selenium-webdriver';
import { WebSocketService } from '../shared/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  newRating: number = 5;
  newComment: string = "";

  isCommentHidden: boolean = false;

  isWatched: boolean = false;
  currentBid: number;
  subscription: Subscription;

  product: Product;
  comments: Comment[];
  productTitle: string;
  constructor(private routeInfo: ActivatedRoute,
    private productService: ProductService,
    private wsService: WebSocketService) { }

  ngOnInit() {
    let productId: number = this.routeInfo.snapshot.params["productId"];
    this.productService.getProduct(productId).subscribe(
      product => {
        this.product = product;
        this.currentBid = this.product.price;
      }
    );
    this.productService.getCommentsForProductId(productId).subscribe(
      comments => { this.comments = comments }
    );
  }

  addComment() {
    let comment = new Comment(0, this.product.id, new Date().toISOString(), "XSJ", this.newRating, this.newComment);
    this.comments.unshift(comment);

    let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);

    this.product.rating = sum / this.comments.length;
    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }

  watchProduct() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription = null;
    } else {
      this.isWatched = !this.isWatched;

      this.subscription = this.wsService.createObservableSocket('ws://localhost:8085', this.product.id)
        .subscribe(
          products => {
            console.log(products);
            let product = products.find(p => p.productId.productId === this.product.id)
            this.currentBid = product.bid;
            console.log(product.bid);
          }
        );
    }
  }
}

