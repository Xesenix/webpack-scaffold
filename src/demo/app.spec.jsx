import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import { i18n } from 'lib/localize';
import React from 'react';

import App from './app';

describe('App', () => {
	beforeEach(() => {
		jasmineEnzyme();
		i18n.setLocale('en');
	});

	describe('render', () => {
		it('should render', () => {
			const component = mount(<App/>);

			expect(component.find('.box')).toIncludeText('REACT is working');
			expect(component.find('img')).toHaveProp('src', 'assets/images/d.png');
		});
	});
});
