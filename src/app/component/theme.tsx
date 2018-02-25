import * as React from 'react';
import { hot } from 'react-hot-loader';
import tinycolor from 'tinycolor2';

import './theme.scss';

class Theme extends React.Component {
	private primaryColorInput;
	private secondaryColorInput;
	private neutralColorInput;
	private glowIntensityInput;
	private style;

	constructor(prop, state) {
		super(prop, state);
		this.style = document.documentElement.style;
	}

	public updateThemeColor(name: string, value: string): void {
		const color = tinycolor(value);
		console.log('color', name, color);
		this.style.setProperty(`--${name}`, '#' + color.toHex8());
		// you can not modify variables color inside css so we predefine set of modified colors
		this.style.setProperty(`--${name}-alpha-10`, '#' + color.setAlpha(.1).toHex8());
		this.style.setProperty(`--${name}-alpha-25`, '#' + color.setAlpha(.25).toHex8());
		this.style.setProperty(`--${name}-alpha-50`, '#' + color.setAlpha(.50).toHex8());
		this.style.setProperty(`--${name}-alpha-75`, '#' + color.setAlpha(.75).toHex8());
		this.style.setProperty(`--${name}-alpha-90`, '#' + color.setAlpha(.9).toHex8());
	}

	public updateThemeValue(name: string, value: string) {
		console.log('value', name, value);
		this.style.setProperty(`--${name}`, value);
	}

	public render() {
		return (
			<div className="theme-box">
				<h3>Swap theme color via style property variable</h3>
				<p>This works post sass so no sass functionality may be used over this color variable.</p>
				<div className="form-group">
					<label>Primary Color</label>
					<input
						className="form-control"
						type="color"
						ref={(input) => this.primaryColorInput = input}
						onChange={(input) => this.updateThemeColor('primaryColor', this.primaryColorInput.value)}
					/>
				</div>
				<div className="form-group">
					<label>Secondary Color</label>
					<input
						className="form-control"
						type="color"
						ref={(input) => this.secondaryColorInput = input}
						onChange={(input) => this.updateThemeColor('secondaryColor', this.secondaryColorInput.value)}
					/>
				</div>
				<div className="form-group">
					<label>Neutral Color</label>
					<input
						className="form-control"
						type="color"
						ref={(input) => this.neutralColorInput = input}
						onChange={(input) => this.updateThemeColor('neutralColor', this.neutralColorInput.value)}
					/>
				</div>
				<div className="form-group">
					<label>Glow Intensity</label>
					<input
						className="form-control"
						type="number"
						min="0"
						max="10"
						step="0.1"
						ref={(input) => this.glowIntensityInput = input}
						onChange={(input) => this.updateThemeValue('glowIntensity', this.glowIntensityInput.value)}
					/>
				</div>
			</div>
		);
	}
}

export default hot(module)(Theme);
