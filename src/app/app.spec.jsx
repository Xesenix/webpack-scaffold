import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';

import App from './app';

describe('App', () => {
	beforeEach(() => {
		jasmineEnzyme();
	});

	describe('render', () => {
		it('should render', () => {
			const component = mount(<App/>);

			expect(component.find('.box')).toIncludeText('REACT is working');
			expect(component.find('img')).toHaveProp('src', 'assets/images/d.png');
		});
	});
});
