import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import App from './app';

describe('App', () => {
	describe('render', () => {
		it('should work', () => {
			const component = ReactTestUtils.renderIntoDocument(<App/>);

			expect(component).toBeTruthy();
		});
	});
});
