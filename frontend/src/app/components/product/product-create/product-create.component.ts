import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { Product } from "../product.model"
import { ProductService } from "./../product.service"

@Component({
	selector: "app-product-create",
	templateUrl: "./product-create.component.html",
	styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
	product: Product = {
		id: "",
		name: "",
		price: "",
	}

	constructor(private ProductService: ProductService, private router: Router) {}

	ngOnInit(): void {}

	createProduct(): void {
		this.ProductService.create(this.product).subscribe(() => {
			this.ProductService.showMessage(
				"Os dados do produto " +
					`${this.product.name}` +
					" foram criados com sucesso!"
			)
			this.router.navigate(["/products"])
		})
	}

	cancel(): void {
		this.router.navigate(["/products"])
	}
}
