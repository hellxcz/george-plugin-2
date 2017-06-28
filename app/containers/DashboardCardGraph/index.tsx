import * as React from 'react';

import DashboardCard from '../../components/dashboardCard';

export default (

  () => (

      <DashboardCard

        header={
          <div>Hello card</div>
        }

        content={
          <div>some body</div>
        }


        footer={
          <div>some footer</div>
        }

      />

  )

);