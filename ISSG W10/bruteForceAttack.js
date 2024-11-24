const crypto = require('crypto');

const targetHash = '5531a5834816222280f20d1ef9e95f69';

for (let i = 0; i <= 9999; i++) {
  const pin = i.toString().padStart(4, '0');
  const hash = crypto.createHash('md5').update(pin).digest('hex');
  
  if (hash === targetHash) {
    console.log(`Alice's PIN is: ${pin}`);
    break;
  }
}

