import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';

import Theme from './theme';

describe('Theme', () => {
	beforeEach(() => {
		jasmineEnzyme();
	});

	describe('render', () => {
		it('should render', () => {
			const component = mount(<Theme/>);

			expect(component).toIncludeText('Swap theme color');
		});

		[{
			name: 'primaryColor',
			label: 'Primary Color',
		}, {
			name: 'secondaryColor',
			label: 'Secondary Color',
		}, {
			name: 'neutralColor',
			label: 'Neutral Color',
		}, {
			name: 'glowIntensity',
			label: 'Glow Intensity',
		}].forEach(({ name, label }) => {
			it(`should set label "${label}" for variable --${name} field`, () => {
				const component = mount(<Theme/>);
				const labelTag = component.find(`[data-key="${name}"] label`);
				expect(labelTag).toIncludeText(label);
			});
		});
	});

	describe('updateThemeColor', () => {
		[{
			name: 'primaryColor',
			color: '#e117ee',
		}, {
			name: 'primaryColor',
			color: '#bada55',
		}, {
			name: 'secondaryColor',
			color: '#e117ee',
		}, {
			name: 'secondaryColor',
			color: '#bada55',
		}, {
			name: 'neutralColor',
			color: '#e117ee',
		}, {
			name: 'neutralColor',
			color: '#bada55',
		}].forEach(({ name, color }) => {
			it(`should set style --${name} variable with color: ${color}`, () => {
				const style = document.documentElement.style;
				const component = mount(<Theme/>);
				const inputTag = component.find(`[data-key="${name}"] input`);
				(inputTag.instance() as any).value = color;
				inputTag.simulate('change');
				expect(style.getPropertyValue(`--${name}`)).toEqual(color + 'ff');
				expect(style.getPropertyValue(`--${name}-alpha-10`)).toEqual(color + '1a');
				expect(style.getPropertyValue(`--${name}-alpha-25`)).toEqual(color + '40');
				expect(style.getPropertyValue(`--${name}-alpha-50`)).toEqual(color + '80');
				expect(style.getPropertyValue(`--${name}-alpha-75`)).toEqual(color + 'bf');
				expect(style.getPropertyValue(`--${name}-alpha-90`)).toEqual(color + 'e6');
			});
		});
	});

	describe('updateThemeValue', () => {
		[{
			name: 'glowIntensity',
			value: '0.1',
		}, {
			name: 'glowIntensity',
			value: '1',
		}, {
			name: 'glowIntensity',
			value: '2',
		}].forEach(({ name, value }) => {
			it(`should set style --${name} variable with value: ${value}`, () => {
				const style = document.documentElement.style;
				const component = mount(<Theme/>);
				const inputTag = component.find(`[data-key="${name}"] input`);
				(inputTag.instance() as any).value = value;
				inputTag.simulate('change');
				expect(style.getPropertyValue(`--${name}`)).toEqual(value);
			});
		});
	});
});
