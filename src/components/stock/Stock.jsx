import React, { useState, useEffect } from 'react';
import '../../css/stock/stock.css';
import Graphic from '../Graphic';
const token = process.env.REACT_APP_STOCK_API_TOKEN;

const Stock = (props) => {
  const { dati,eliminoStock } = props;
  const { ticker, price } = dati;

  const [tickerData, setTickerData] = useState({ ticker, price });
  const [datatrade, setDatatrade] = useState(new Date().toLocaleTimeString());
  const [ckrealtime, setCkrealtime] = useState('');
  const [datigrafico, setDatagrafico] = useState([
    { datetime: new Date().toLocaleTimeString(), price: price },
  ]);
  const [showgrafico, setShowgrafico] = useState(false);
  const [diff, setDiff] = useState(0);
  const [percentuale, setPercentuale] = useState(0);

  useEffect(() => {
    console.log('1f) FIGLIO Creo istanza');
  }, []);

  useEffect(() => {
    if (ticker !== tickerData.ticker) {
      setTickerData({ ticker, price });
    }
  }, [ticker, tickerData.ticker, price]);

  useEffect(() => {
    if (ckrealtime === 'checked') {
      const timer = setInterval(() => getNewElementi(), 10000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [ckrealtime]);

  const getNewElementi = () => {
    const url = `https://api.stockdata.org/v1/data/quote?symbols=${ticker}&api_token=${token}`;
    console.log(url);
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        console.log('data', data);

        const tickerData = data.data[0];
        const random =
          (Math.ceil(Math.random() * 10) *
            (Math.round(Math.random()) ? 1 : -1)) /
          3;
        const datatrade = new Date().toLocaleTimeString();
        console.log(datatrade);

        const dayOpen = tickerData.day_open;
        const newPrice = Number(dayOpen) + random;
        console.log(newPrice);

        const newDatagrafico = [
          ...datigrafico,
          { datetime: datatrade, price: newPrice },
        ];
        setTickerData({ ticker, price: newPrice });
        setDatatrade(datatrade);
        setDatagrafico(newDatagrafico);

        // Calcola la differenza tra il prezzo corrente e il prezzo di chiusura precedente
        const newDiff = (newPrice - dati.previous_close_price).toFixed(2);
        setDiff(newDiff);

        // Calcola la percentuale di variazione
        const newPercentuale = ((newDiff / dati.previous_close_price) * 100).toFixed(2);
        setPercentuale(newPercentuale);
      })
      .catch((error) => {
        console.log('Fetch failed', error);
      });
  };

  const showGrafico = () => {
    setShowgrafico(!showgrafico);
  };

  const disabled =
    datatrade >= '09:00:00' && datatrade <= '20:00:00' ? false : true;

  return (
    <div className="stock col-md-6 p-3">
      <div className="bodystock">
        <i className="fas fa-times-circle closebtn" onClick={eliminoStock}></i>
        <div className="row">
          <div className="col-sm">
            <h2 className="giallo">{ticker}</h2>
            <p>Nasdaq</p>
          </div>
          <div className="col-sm">
            <h2>{parseFloat(tickerData.price).toFixed(2)}</h2>
            <p className="giallo">{datatrade}</p>
          </div>
          <div className="col-sm">
            <h2>{diff}</h2>
            <p style={{ color: percentuale < 0 ? 'red' : 'green' }}>
              {percentuale} %
            </p>
          </div>
          <div className="col-sm">
            <p>
              <i
                className="fas fa-chart-line fa-2x"
                onClick={showGrafico}
              ></i>
            </p>
            <label className="bs-switch">
              <input
                type="checkbox"
                checked={ckrealtime}
                onChange={() =>
                  setCkrealtime(ckrealtime === 'checked' ? '' : 'checked')
                }
                disabled={disabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
      <div className="bodygrafico">
        <div className="row">
          <div className="col-sm">
            {showgrafico && <Graphic data={datigrafico} chiusura={dati.price} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
