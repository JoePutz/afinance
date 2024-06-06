import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.scss';
import {QueryClient, QueryClientProvider} from 'react-query';


//Entry point for Project
const queryClient = new QueryClient();
ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    </React.StrictMode>,

    document.getElementById('root')
);

