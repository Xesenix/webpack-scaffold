import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import './theme.scss';

class Theme extends React.Component {
	updateColorTheme() {
		document.documentElement.style.setProperty('--timerColor', this.colorInput.value);
	}

	render() {
		return (
			<div className="theme-box">
				<h3>Swap theme color via style property variable</h3>
				<p>This works post sass so no sass functionality may be used over this color variable.</p>
				<div className="form-group">
					<label>Color</label>
					<input className="form-control" type="color" ref={input => this.colorInput = input} onChange={this.updateColorTheme.bind(this)}/>
				</div>
			</div>
		);
	}
}

export default hot(module)(Theme);
