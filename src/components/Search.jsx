import React, { useState } from 'react';

const Search = ({ onInputSearch }) => {
  const [cerca, setCerca] = useState('');

  const onInputChange = e => {
    setCerca(e.target.value);
    console.log(cerca); // Nota che `cerca` può non essere immediatamente aggiornato, quindi questo log potrebbe non mostrare l'ultimo valore.
  }

  const onSubmit = e => {
    e.preventDefault();
    onInputSearch(cerca);
    setCerca('');
  }

  const onFocus = e => {
    e.target.blur();
  }

  return (
    <div className='row'>
      <form className="form-inline" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="cerca"
            className="form-control"
            value={cerca}
            onChange={onInputChange}
            placeholder="Cerca..."
          />
        </div>
        <button type='submit' onFocus={onFocus} className='btn btn-warning cercaButton'><i className="fas fa-search"></i></button>
      </form>
    </div>
  );
}

export default Search;
