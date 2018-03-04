import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import { i18n } from 'lib/localize';
import React from 'react';

import LanguageSwitch from './language-switch';

describe('LanguageSwitch', () => {
	beforeEach(() => {
		jasmineEnzyme();
	});

	describe('render', () => {
		it('should render', () => {
			// tslint:disable:no-empty
			const component = mount(<LanguageSwitch onChange={() => {}}/>);

			expect(component).toIncludeText('en');
			expect(component).toIncludeText('pl');
		});
	});

	describe('onChange', () => {
		it('should call callback', () => {
			spyOn(i18n, 'setLocale');
			const spy = jasmine.createSpy('spy');
			const component = mount(<LanguageSwitch onChange={spy}/>);
			const selectTag = component.find(`select`);
			(selectTag.instance() as any).value = 'pl';
			selectTag.simulate('change');
			expect(spy).toHaveBeenCalled();
			expect(i18n.setLocale).toHaveBeenCalledWith('pl');
		});
	});
});
