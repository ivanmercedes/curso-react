import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Cancion = ({letra}) => {

    if(letra.length ===0 ) return null;

    return ( 
        <Fragment>
            <h2>Letra Cancion</h2>
            <p className="letra">{letra}</p>
        </Fragment>
     );
}


Cancion.prototype = {
    letra: PropTypes.string.isRequired
}
 
export default Cancion;