import React, { useState } from 'react';


const useSelect = (stateInicial, opciones) => {

    // state del custom hook
    const [state, actulizarState] = useState(stateInicial);

    const SelectNoticias = () =>(
        <select
        className="browser-default"
        value={state}
        onChange={e => actulizarState(e.target.value)}
        >
         {opciones.map(opcion =>(
               <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
         ))}
        </select>
    );

    return [state, SelectNoticias];
}
 
export default useSelect;


