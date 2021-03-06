import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import awsConfig from 'aws-exports';

import 'antd/dist/antd.css';
import initErrorLogging from 'utils/sentry';

import route from './route';

import configureStore from './redux/configureStore';
import './asset/css/index.css';

// set amplify default config
Amplify.configure(awsConfig);

initErrorLogging();

// Create redux store
const initialState = {};
const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(<Provider store={store}>{route()}</Provider>, MOUNT_NODE);
