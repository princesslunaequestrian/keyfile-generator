let privateKey = process.argv[2];
let pass = process.argv[3];

if (!privateKey || privateKey.length === 0) {
  console.log("You need to specify a private key");
  process.exit(1);
}

if (!pass || pass.length === 0) {
  console.log("You need to specify a password for the JSON key");
  process.exit(1);
}

if (privateKey.startsWith('0x')) {
  privateKey = privateKey.substring(2);
}

const Wallet = require('ethereumjs-wallet').default;
const fs = require('fs');
let key = Buffer.from(privateKey, 'hex');
let wallet = Wallet.fromPrivateKey(key);

(async function () {
  let s = await wallet.toV3String(pass);
  const fullName = `./keys/${wallet.getV3Filename()}`;
  fs.writeFileSync(fullName, JSON.stringify(s));
  console.log(`V3 key was written to ${fullName}`);
})();