import 'jsdom-global/register';
import {expect} from 'chai';
import React from 'react';
import {AppPage} from '../pages/AppPage';
import App from '../../src/ui/App';
import mountWithMemory from '../helpers/mountWithMemory';
import startDevServer from '../../src/server';

describe('UI: e2e', () => {
  let stopDevServer: () => void;
  let appPage: any;

  beforeEach(async () => {
    stopDevServer = await startDevServer();
    const appWrapper = mountWithMemory(<App/>);
    appPage = new AppPage(appWrapper);
  });

  it('Go to main page', () => {
    expect(appPage.getMainScreenClassName()).to.eq(true);
  });

  afterEach(() => {
    stopDevServer();
  });
});
