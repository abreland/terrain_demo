import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {ViewerComponent} from './components/ViewerComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ViewerComponent />
    </React.StrictMode>,
);
