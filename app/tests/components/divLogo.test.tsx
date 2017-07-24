import * as React from 'react';

import * as renderer from 'react-test-renderer';

import LogoDiv from '../../components/LogoDiv'
import { Logo } from '../../apiClient/dtos';

import {shallow} from 'enzyme';

test('shouldrender', () => {

  const logo : Logo = {
    id: null,
    uri: 'http://ssl.gstatic.com/gb/images/v2_3d4fbfa8.png',
  };

  const component = renderer.create(

    <LogoDiv logo={logo} />

  );


  const tree = component.toJSON();
});