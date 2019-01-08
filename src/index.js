import dva from 'dva';
import './index.css';
// import createLogger from 'redux-logger';

import createHistory from 'history/createBrowserHistory';
// 1. Initialize
const app = dva({
	// onAction: createLogger(),
	onError(e, dispatch) {
	    console.log(e.message);
	},
	history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
require('./models').default.forEach(key=>app.model(key.default));

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store;