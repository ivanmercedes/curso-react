import React from 'react';
import PropTypes from 'prop-types';

const Imagen = ({imagen}) => {

    // extraer las variables
    const {largeImageURL, likes, previewURL, tags, views} = imagen;

    return ( 
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card">
                <img src={previewURL} alt={tags} className="mb-4 card-img-top"/>

                <div className="card-body">
                    <p className="card-text">{likes} Me Gusta</p>
                    <p className="card-text">{views} Vistas</p>
                </div>

                <div className="card-footer">
                    <a
                    href={largeImageURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-block"
                    >Ver Imagen</a>
                </div>
            </div>
        </div>
        );
}
 Imagen.prototype ={
    imagen: PropTypes.object.isRequired
 }
export default Imagen;