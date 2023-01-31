import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar"
import { catchError, EMPTY, map, Observable } from "rxjs"
import { Product } from "./product.model"

@Injectable({
	providedIn: "root",
})
export class ProductService {
	baseUrl = "https://my-json-server.typicode.com/nakaohideki/backend-Angular/products"

	constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

	showMessage(msg: string, error: boolean = false): void {
		this.snackBar.open(msg, "X", {
			duration: 3000,
			horizontalPosition: "right",
			verticalPosition: "top",
			panelClass: error ? "error" : "success",
		})
	}

	create(product: Product): Observable<Product> {
		return this.http.post<Product>(this.baseUrl, product).pipe(
			map((obj) => obj),
			catchError((e) => this.errorHandler(e))
		)
	}

	read(): Observable<Product[]> {
		return this.http.get<Product[]>(this.baseUrl).pipe(
			map((obj) => obj),
			catchError((e) => this.errorHandler(e))
		)
	}

	readById(id: string): Observable<Product> {
		const url = `${this.baseUrl}/${id}`
		return this.http.get<Product>(url).pipe(
			map((obj) => obj),
			catchError((e) => this.errorHandler(e))
		)
	}

	update(product: Product): Observable<Product> {
		const url = `${this.baseUrl}/${product.id}`
		return this.http.put<Product>(url, product).pipe(
			map((obj) => obj),
			catchError((e) => this.errorHandler(e))
		)
	}

	delete(id: string): Observable<Product> {
		const url = `${this.baseUrl}/${id}`
		return this.http.delete<Product>(url).pipe(
			map((obj) => obj),
			catchError((e) => this.errorHandler(e))
		)
	}

	errorHandler(e: any): Observable<any> {
		this.showMessage(
			e.message ==
				"Http failure response for http://localhost:3001/products: 0 Unknown Error"
				? "Falha durante o processo de conexão com o back-end."
				: "Erro desconhecido",
			true
		)
		return EMPTY
	}
}
