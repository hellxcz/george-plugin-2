import * as React from 'react';

import { Logo } from '../../apiClient/dtos';
export interface Props {

  logo: Logo;

}

const getLogo = (logo: Logo) => {

  if (logo.id) {
    return <img src={logo.uri}/>
  } else {

    const className = logo.uri.split(':')[1];

    return (<svg className={className}>

      <use xlinkHref={'#' + className}/>

    </svg>);

  }
};

const sfc: React.SFC<Props> = (
  ({ logo }) => getLogo(logo)
);

export default sfc;