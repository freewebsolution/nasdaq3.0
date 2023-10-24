import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './css/App.css';
import Stock from './components/stock/Stock';
import Search from './components/Search';
import StockName from './components/StockName'
const token = process.env.REACT_APP_STOCK_API_TOKEN;

const App = () => {
  const [listaelementi, setListaelementi] = useState([]);
  const [listapreferiti, setListapreferiti] = useState([]);
  const [inCaricamento, setInCaricamento] = useState(false);
  const [showError, setShowError] = useState(false);
  const [msg, setMsg] = useState(null);
  const [showAvviso, setShowAvviso] = useState(false);
  const [msgAvviso, setMsgAvviso] = useState('');

  useEffect(() => {
    console.log('1g) il costruttore crea la prima istanza Genitore');
  }, []);

  const cercaElementi = (str) => {
    console.log('Dati', listaelementi);
    getElementi(str);
  };

  const getElementi = (str) => {
    const url = `https://api.stockdata.org/v1/data/quote?symbols=${str}&api_token=${token}`;
    setInCaricamento(true);
    setShowError(false);
    setShowAvviso(false);

    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        console.log('Risposta API', r);
        const data = r.data; // Assicurati che "data" sia l'array corretto
        console.log('Data:', data);
        if (Array.isArray(data)) {
          setListaelementi(data);
          setInCaricamento(false);
          console.log('Stato impostato correttamente');
        } else {
          console.error('I dati ricevuti non sono un array');
        }
      })
      .catch((error) => {
        setInCaricamento(false);
        setShowError(true);
        setMsg(error.message);
        console.error('Fetch failed', error);
      });
  };

  const addPreferiti = (ids) => {
    // alert(`Hai cliccato sull'elemnto ${ids}`);
    setListapreferiti([...listapreferiti, listaelementi[ids]]);
  };

  const eliminoStock = (symbol) => {
    const preferiti = listapreferiti.filter((el) => {
      if (el.symbol !== symbol) return true;
      return false;
    });
    setListapreferiti(preferiti);
  };

  console.log('2g) Genitore Render');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ color: 'gold' }}>Applicazione Stock Exchange</p>
        <Search onInputSearch={cercaElementi} />
        <div className="container-fluid" style={{ marginTop: '20px' }}>
          <section className="col-md-12 listanomi">
            <div className="row">
              <div className="col">
                {inCaricamento && <p className="text-center">Caricamento in corso ...</p>}
                {showError && <p className="text-center">{msg}</p>}
                {showAvviso && <p className="text-center">{msgAvviso}</p>}
                {Array.isArray(listaelementi) && listaelementi.length > 0 ? (
                  listaelementi.map((el, index) => (
                    <StockName key={index} data={el} ids={index} onAddPreferiti={addPreferiti} />
                  ))
                ) : (
                  <p>Nessun risultato trovato</p>
                )}
              </div>
            </div>
          </section>
          <section className="listapreferiti row">
            {listapreferiti.map((el, index) => (
              <Stock key={index} dati={el} eliminoStock={eliminoStock} symbol={el.symbol} />
            ))}
          </section>
        </div>
      </header>
    </div>
  );
};

export default App;
