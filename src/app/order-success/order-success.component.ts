import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../order.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  order:any={};
  id;
  constructor(private route: ActivatedRoute , private orderService: OrderService) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.orderService.get(this.id).pipe(take(1)).subscribe(p =>
      {
        this.order=p;
        console.log(this.order)
      });
    }
  }

  ngOnInit(): void {
  }

}
