import {ReactWrapper} from 'enzyme';

export class AppPage {
  constructor(private wrapper: ReactWrapper) {
  }

  getPageTitle() {
    return this.wrapper.find('.title').text();
  }
}
