import { Component, ViewChild } from "@angular/core"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { MatTable } from "@angular/material/table"
import { Product } from "../product.model"
import { ProductService } from "../product.service"
import { ProductReadDataSource } from "./product-read-datasource"

@Component({
	selector: "app-product-read",
	templateUrl: "./product-read.component.html",
	styleUrls: ["./product-read.component.css"],
})
export class ProductReadComponent {
	displayedColumns = ["id", "name", "price"]
	products: Product[] = []

	@ViewChild(MatPaginator) paginator!: MatPaginator
	@ViewChild(MatSort) sort!: MatSort
	@ViewChild(MatTable) table!: MatTable<Product>
	dataSource: ProductReadDataSource = new ProductReadDataSource()

	constructor(private productService: ProductService) {
		this.productService.read().subscribe((products) => {
			this.dataSource.data = products
			this.dataSource.sort = this.sort
			this.dataSource.paginator = this.paginator
			this.table.dataSource = this.dataSource
		})
	}
}
