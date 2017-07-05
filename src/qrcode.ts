const qrcode = require('qrcode-generator');

function generateQRCode() {
  const ssid = (<HTMLInputElement>document.getElementById('ssid')).value;
  const pass = (<HTMLInputElement>document.getElementById('pass')).value;
  const security =
    (<HTMLInputElement>document.querySelector('input[name="security"]:checked')).value;
  const escape = (s: string) => s.replace(/([^0-9a-zA-Z])/g, "\\$1");
  const escapedSsid = escape(ssid);
  const escapedPass = escape(pass);

  const qrtext = "WIFI:S:" + escapedSsid + ";T:" + security + ";P:" + escapedPass + ";;";
  const qr = qrcode(4, 'M');
  qr.addData(qrtext);
  qr.make();

  document.getElementById('text_output').textContent = qrtext;
  document.getElementById('img_output').innerHTML = qr.createImgTag(6);
}

document.querySelectorAll('input.autorefresh').forEach(
  (s: HTMLInputElement) => s.oninput = generateQRCode
)
document.querySelectorAll('input[type="radio"]').forEach(
  (s: HTMLInputElement) => s.onclick = generateQRCode
)

generateQRCode();
