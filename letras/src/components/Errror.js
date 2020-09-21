import React from 'react';
import PropTypes from 'prop-types';

const Error = ({mensaje}) => {
    return ( 
    <p className="alert alert-danger text-center p-2">{mensaje}</p>
     );
}
 
Error.prototype = {
    mensaje: PropTypes.string.isRequired
}

export default Error;