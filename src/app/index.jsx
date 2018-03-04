import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './app';

export default (onReady) => ReactDOM.render(<App onReady={ onReady }/>, document.getElementById('app'));
