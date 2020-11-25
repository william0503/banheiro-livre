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

// preciouschicken.com is the MQTT topic
client.subscribe('banheirolivre/state');

function App() {
  var note;
  client.on('message', function (topic, message) {
    note = message.toString();
    // Updates React state with message
    setMesg(note);
    console.log(note);
    client.end();
  });

  // Sets default React state
  const [mesg, setMesg] = useState(
    <Fragment>
      <em>Aguarde</em>
    </Fragment>
  );
  let result;
  switch (mesg) {
    case 'falsefalse':
      result = (
        <>
          <p>banheiro 1 liberado</p>
          <p>banheiro 2 liberado</p>
        </>
      );
      break;
    case 'truefalse':
      result = (
        <>
          <p>banheiro 1 ocupado</p>
          <p>banheiro 2 liberado</p>
        </>
      );
      break;
    case 'falsetrue':
      result = (
        <>
          <p>banheiro 1 liberado</p>
          <p>banheiro 2 ocupado</p>
        </>
      );
      break;
    case 'truetrue':
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
