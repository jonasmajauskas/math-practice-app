import * as ReactDOM from 'react-dom';

if (!ReactDOM.hydrate) {
  ReactDOM.hydrate = ReactDOM.render;
}

if (!ReactDOM.unmountComponentAtNode) {
  ReactDOM.unmountComponentAtNode = ReactDOM.unmountComponentAtNode;
}
 