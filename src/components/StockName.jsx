import React from 'react';

const StockName = ({ onAddPreferiti, ids, data }) => {
  const addPreferiti = () => {
    onAddPreferiti(ids);
  };

  return (
    <div className='nomestock' onClick={addPreferiti}>
      <i className="fas fa-plus-circle"></i>{data.ticker} - {data.name}
    </div>
  );
};

export default StockName;
