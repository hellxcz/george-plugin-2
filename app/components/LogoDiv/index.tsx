import * as React from 'react';

import { CSSProperties } from 'react';

import { Logo } from '../../apiClient/dtos';

export interface Props {

  logo: Logo;

}


const getSvg = (logo: Logo) : JSX.Element => {

  if (logo.id){
    return <div/>;
  }

  const className = logo.uri.split(':')[1];

  return (<svg className={'ic-md '+ className}>

    <use xlinkHref={'#' + className}/>

  </svg>);


};

const LogoDiv: React.SFC<Props> =
  ({ logo }) => {

    const style: CSSProperties = {
      'background-size': 'contain !important',
      'background-position': 'center center !important',
      'background-image': `url(${logo.id ? logo.uri : ''})`
    };


    return (
      <div className="icondiv iconcircle notinprint"
           style={style}>

        {getSvg(logo)}

      </div>
    )
  }
;

export default LogoDiv;