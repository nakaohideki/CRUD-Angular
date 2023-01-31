import { Directive, ElementRef } from "@angular/core"

@Directive({
	selector: "[White]",
})
export class WhiteDirective {
	constructor(private el: ElementRef) {
		el.nativeElement.style.color = "#FFF"
	}
}
