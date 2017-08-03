import * as React from 'react';

import * as renderer from 'react-test-renderer';

import LogoDiv from '../../components/LogoDiv'
import { Logo } from '../../apiClient/dtos';

import {shallow} from 'enzyme';
import { renderCategoryTransactions_usingLineChart, renderCategoryTransactions_usingAreaChart } from '../../containers/SmartFilterCard/chartRenderers';
import { hardcoded_transactions } from '../../apiClient/index';



test('should render', () => {



  renderCategoryTransactions_usingAreaChart("123", hardcoded_transactions);

});