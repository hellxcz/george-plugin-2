//http://webdriver.io/api/utility/waitForExist.html

// https://github.com/michaelguild13/Selenium-WebdriverIO-Mocha-Chai-Sinon-Boilerplate/blob/master/

import { expect } from 'chai';
import { saveScreenshot } from "./helpers";
import Client = WebdriverIO.Client;

import {foodBoxId, withdrawalId} from '../../sandbox-specific/constants';

const inPromise = <T>(input: Client<T>) => {
  return new Promise(
    (resolve, reject) => {
      input.then(() => resolve())
        .catch(error => reject(error))

    }
  )

};

describe('try plugin', () => {

  // before((done) => {
  //   client.init().url('https://localhost:8080/', done);
  // });


  describe('happy day', async () => {

    it('should pass', async () => {

      browser.url('https://localhost:8080');

      browser.waitForExist('input.enable-plugin');

      saveScreenshot();

      browser.element('input.enable-plugin').click();

      saveScreenshot();

      browser.element('button.btn.login').click();

      saveScreenshot();

      // wait till load
      browser.waitForExist('#pageContainer', 70 * 1000);
      browser.waitForExist('#accountName', 70 * 1000);

      saveScreenshot();

      const food = browser.element(`#${foodBoxId}`);
      expect(food.isExisting());

      // navigate to food transaction page
      food.element(".footer-link").click();

      browser.waitForExist('.transaction-line', 4 * 1000);

      saveScreenshot();

      // go back

      browser.back();

      const withdrawal = browser.element(`#${withdrawalId}`);

      expect(withdrawal.isExisting());

      // navigate to withdrawal transaction page

      saveScreenshot();


      withdrawal.element(".footer-link").click();

      browser.waitForExist('.transaction-line', 4 * 1000);

      saveScreenshot();


    });

  });

  // after((done) => {
  //   client.end();
  //
  //   done();
  // });

});
