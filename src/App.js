import React, { useState, Fragment } from 'react';
import './App.css';

var mqtt = require('mqtt');
var options = {
  protocol: 'mqtts',
  // clientId uniquely identifies client
  // choose any string you wish
  clientId: 'b0908853',
};
var client = mqtt.connect('mqtt://test.mosquitto.org:8081', options);

client.subscribe('banheirolivre/Banheiro1React');
client.subscribe('banheirolivre/Banheiro2React');

var banheiro1 = '0';
var Banheiro2 = '0';

function App() {
  var note;
  client.on('message', function (topic, message) {
    note = message.toString();
    if (topic === 'banheirolivre/Banheiro1React'){
      banheiro1 = note;
    }
    else {
      Banheiro2 = note;
    }
    // Updates React state with message
    setMesg(banheiro1 + Banheiro2);
    console.log(banheiro1 + Banheiro2 + ' - ' + topic);
    //client.end();
  });

  // Sets default React state
  const [mesg, setMesg] = useState(
    <Fragment>
      <em>Aguarde</em>
    </Fragment>
  );
  let result;
  switch (mesg) {
    case '00':
      result = (
        <>
          <p>banheiro 1 liberado</p>
          <p>banheiro 2 liberado</p>
        </>
      );
      break;
    case '10':
      result = (
        <>
          <p>banheiro 1 ocupado</p>
          <p>banheiro 2 liberado</p>
        </>
      );
      break;
    case '01':
      result = (
        <>
          <p>banheiro 1 liberado</p>
          <p>banheiro 2 ocupado</p>
        </>
      );
      break;
    case '11':
      result = (
        <>
          <p>banheiro 1 ocupado</p>
          <p>banheiro 2 ocupado</p>
        </>
      );
      break;
    default:
      result = (
        <Fragment>
          <em>Aguarde</em>
        </Fragment>
      );
  }
  return (
    <div className="App">
      <header className="App-header">{result}</header>
    </div>
  );
}

export default App;
