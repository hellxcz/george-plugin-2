import * as ReactDOM from 'react-dom';

export const render = (elementId, reactElement) => {

  ReactDOM.render(
    reactElement,
    document.getElementById(elementId)
  );

};