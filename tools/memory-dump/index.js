const SerialPort = require('serialport');
const Ready = require('@serialport/parser-ready');
const Readline = require('@serialport/parser-readline');
const fs = require('fs');
const ProgressBar = require('progress');

const PORT_NAME = '/dev/tty.usbserial-AI02N1UC';
const OUTPUT_FILE = 'out.hex';
const START_ADDRESS = '0xC1000000';
const NUMBER_OF_OBJECTS = '0x50000'
const NUMBER_OF_BYTES = parseInt(NUMBER_OF_OBJECTS, 16) * 4;
const NUMBER_OF_LINES = Math.ceil(NUMBER_OF_OBJECTS / 4);
const END_ADDRESS = '0x' + (parseInt(START_ADDRESS, 16) + NUMBER_OF_BYTES).toString(16).toUpperCase();
const LAST_LINE_ADDRESS = '0x' + (parseInt(START_ADDRESS, 16) + (NUMBER_OF_LINES - 1) * 16).toString(16).toUpperCase();

var progress = new ProgressBar(':bar :percent :etas', { total: NUMBER_OF_LINES });

const port = new SerialPort(PORT_NAME, {
  baudRate: 115200,
  autoOpen: false
});

port.on('open', () => {
  console.log(`Port ${port.path} opened`);
});

port.on('close', () => {
  console.log();
  console.log(`Port ${port.path} closed`);
  process.exit(0);
});

console.log(process.pid);

process.on('SIGINT', () => {
  if (port.isOpen) {
    port.close();
  }
});

const readyParser = new Ready({delimiter: 'Hit Enter key to stop autoboot'});
port.pipe(readyParser);

const readlineParser = new Readline({delimiter: String.fromCharCode(10) + String.fromCharCode(13)});

const file = fs.createWriteStream(OUTPUT_FILE, {encoding: 'utf-8'});
readyParser.pipe(file);

readyParser.on('data', data => {
  // console.log(data.toString());
});

readyParser.on('ready', (async (data) => {
  port.write('\r');
  await wait(1000);
  port.write('sf probe 0\r');
  await wait(1000);
  port.write('sf read 0xC1000000 0x0 0x800000\r');
  await wait(1000);
  port.write(`md ${START_ADDRESS} ${NUMBER_OF_OBJECTS}\r`);
  console.log(`Reading ${NUMBER_OF_BYTES} bytes from ${START_ADDRESS} to ${END_ADDRESS}. Last line address ${LAST_LINE_ADDRESS}`);

  readyParser.pipe(readlineParser);

  readyParser.on('data', data => {
    
    data.toString().split(String.fromCharCode(13) + String.fromCharCode(10)).forEach(line => {
      if (/^c1[a-f0-9]{6}/.test(line)) {
        progress.tick();
      } else if (/GK7102S # /.test(line)) {
        progress.terminate();
        port.close();
      }
    })
  })
}));

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

port.open();


