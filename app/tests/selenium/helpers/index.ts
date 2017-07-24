let screenshotsCounter = 0;

export const saveScreenshot = (name?:string) => {

  if (name === undefined){

    name = screenshotsCounter++ + '.png';

  }

  browser.saveScreenshot('./app/tests/selenium/_screenshots/' + name);

};

