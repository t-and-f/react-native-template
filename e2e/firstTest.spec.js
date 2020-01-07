// import * as React from 'react';
// import App from '../src/App';
// import {shallow} from 'enzyme';

const fetch = require('node-fetch');

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('Welcome'))).toBeVisible();
  });

  // it('should have a toast message appear on button press', async () => {
  //   const wrapper = shallow(<App />);
  //   wrapper
  //     .find(Button)
  //     .first()
  //     .props()
  //     .onPress();
  //   await expect(element(by.text('Button pressed'))).toBeVisible();
  // });

  test('should call API and return correct message', async () => {
    // return fetch('https://test-health-api.herokuapp.com/').then(res =>
    //   res.text().then(resText => expect(resText).toBe('OK!')),
    // );

    return fetch('https://test-health-api.herokuapp.com/').then(res =>
      res.text().then(resText => {
        console.log(resText);
        expect(resText).toBe('OK!');
      }),
    );
  });
});
