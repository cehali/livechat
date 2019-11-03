import 'jsdom-global/register';
import {expect} from 'chai';
import React from 'react';
import {AppPage} from '../pages/AppPage';
import App from '../../src/ui/App';
import mountWithMemory from '../helpers/mountWithMemory';
import startServer from '../../src/server';

describe('UI: e2e', () => {
  let stopServer: () => void;
  let appPage: any;

  beforeEach(async () => {
    stopServer = await startServer();
    const appWrapper = mountWithMemory(<App/>);
    appPage = new AppPage(appWrapper);
  });

  it('Go to main page', () => {
    expect(appPage.getMainScreenClassName()).to.eq(true);
  });

  afterEach(() => {
    stopServer();
  });
});
