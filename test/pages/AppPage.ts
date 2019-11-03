import {ReactWrapper, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

export class AppPage {
  constructor(private wrapper: ReactWrapper) {
  }

  getMainScreenClassName() {
    return this.wrapper.find('.main-screen').exists();
  }

  clickClientBtn() {
    this.wrapper.find('#clientBtn').simulate('click');
  }

  clickHostBtn() {
    this.wrapper.find('#hostBtn').simulate('click');
  }

  getNoClientsText() {
    return this.wrapper.find('#noClientsText').exists();
  }
}
