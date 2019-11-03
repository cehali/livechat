import React from 'react';
import {MemoryRouter} from 'react-router';
import {mount} from 'enzyme';

const mountWithMemory = (component: any, initialEntries = ['/']) =>
  mount(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>,
  );

export default mountWithMemory;
