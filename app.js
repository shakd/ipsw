const request = require('request');
const fs = require('fs');
const clipboardy = require('clipboardy');
var device = "";
var version = "";
var links = "";
process.argv.forEach(function (val, index, array) {
  switch (index) {
    case 2:
      device = val;
      break;
      case 3:
      version = val;
    default:
      break;
  }
});
if (device =="" || version == ""){
  console.error('Please specify device and version.');
  process.exit(1);
}
device = device.charAt(0) + device.charAt(1).toUpperCase() + device.slice(2)

var patt = /^(\d+\.){1}(\d+){1}(\.\d+)?$/;
if (patt.test(version)){
  var str = version.match(patt);
  version = str.slice(',')[0];
}else{
  console.error('Please specify device and version.');
  process.exit(1);
}


console.log(device + ': ' + version);

request('https://api.ipsw.me/v4/ipsw/' + version, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  const iPhoneBody = body.filter(d => d.identifier.startsWith('iPhone'));

  iPhoneBody.forEach(Element => {
   // console.log(Element.url);
    links = links + Element.url + '\n';
    
    clipboardy.writeSync(links);
  
   // var indexPos = Element.url.lastIndexOf('/') +1;
    //console.log(Element.url.substring(indexPos));
});
});
console.log('Links copied to clipboard!');