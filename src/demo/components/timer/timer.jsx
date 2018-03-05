import { __ } from 'lib/localize';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import './timer.scss';

class Timer extends React.Component {
	constructor() {
		super();
		this.state = {
			start: 0
		};
	}

	componentDidMount() {
		this.setState({ start: Date.now() });
		this.intervalHandle = setInterval(() => {
			this.setState({});
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.intervalHandle);
	}

	render() {
		const { start = 0 } = this.state;

		return (
			<span className="timer">
				<p>{ __('Time') }: { (new Date(Date.now() - start)).toLocaleTimeString() }</p>
			</span>
		);
	}
}

export default hot(module)(Timer);
