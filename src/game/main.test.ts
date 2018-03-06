import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/**
 * Required to import interceptor during tests to prevent:
 * TypeError: Cannot read property 'call' of undefined
 * @see https://github.com/theKashey/rewiremock#webpack-troubleshooting
 */
import 'rewiremock/webpack/interceptor';

Enzyme.configure({ adapter: new Adapter() });

const excludeRegexp: RegExp = /\..*\/(main|index)\./;
/**
 * We need to load all test files to be included in karma. And all others to generate test coverage.
 * @see https://github.com/webpack-contrib/karma-webpack#alternative-usage
 */
const context = require.context('.', true, /\.(t|j)sx?$/);
context.keys().filter(p => !excludeRegexp.test(p)).forEach(context);
