import React from 'react';

function Titulo({ cor }) { 
  let nome = "Arthur";

  return (
    <div>
      <h1 style={{ color: cor }}>
        Oi meu nome é {nome}
      </h1>
    </div>
  );
}

export default Titulo;
