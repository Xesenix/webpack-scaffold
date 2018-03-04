import { __, languages, setLocale } from 'lib/localize';
import * as React from 'react';
import { hot } from 'react-hot-loader';

class LanguageSwitch extends React.Component<{ onChange: () => void }> {
	private languageSelect;

	public onChange = () => {
		const { onChange } = this.props;
		setLocale(this.languageSelect.value);
		// change hook to trigger refresh
		onChange();
	}
	public render() {
		return (
			<div className="form-group">
				<label>
					{ __('Language') }:
				</label>
				<select
					className="form-control"
					ref={(input) => this.languageSelect = input}
					onChange={this.onChange}
				>
					{ languages.map((locale: string) => <option key={locale} value={locale}>{ locale }</option>) }
				</select>
			</div>
		);
	}
}

export default hot(module)(LanguageSwitch);
