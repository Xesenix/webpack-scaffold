import { __ } from 'lib/localize';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import Timer from './component/timer';
import Theme from './component/theme';
import LanguageSwitch from './component/language-switch';

class App extends React.Component {
	/**
	 * Hook for cheking mounting time.
	 */
	componentDidMount() {
		const { onReady } = this.props;

		if (typeof onReady === 'function') {
			onReady();
		}
	}

	render() {
		return (<div className="box inverse">
			<h3>{ __('REACT is working') }</h3>
			<code>&lt;img src="assets/images/d.png"/&gt;</code>
			<img src="assets/images/d.png"/>
			<h3>{ __('Sub component') }</h3>
			<p>{ __('Styled via component stylesheet.') }</p>
			<Timer/>
			<Theme/>
			<h3>{ __('Choose language') }</h3>
			<p>{ __('Should update dynamic parts of site with choosen language.') }</p>
			<LanguageSwitch onChange={() => /* trigger render */ this.setState({})}/>
		</div>);
	}
}

export default hot(module)(App);
