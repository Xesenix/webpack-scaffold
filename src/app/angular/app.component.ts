import { Component } from '@angular/core';

@Component({
	selector: 'app',
	template: require('./app.component.html'),
	// styles: [require('./app.component.css')],
})
export class AppComponent {
	constructor() {
		this.icons = [
			'asterisk',
			'car',
			'cc-paypal',
			'cc-visa',
			'cc-stripe',
			'arrow-left',
			'arrow-up',
			'arrow-right',
			'arrow-down',
			'arrow-circle-left',
			'arrow-circle-up',
			'arrow-circle-right',
			'arrow-circle-down',
			'cog',
			'beer',
			'bomb',
			'bolt',
		];
	}
}
