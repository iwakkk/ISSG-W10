const https = require('https');
const crypto = require('crypto');

// The MD5 hash to crack
const targetHash = '578ed5a4eecf5a15803abdc49f6152d6';

// URL of the dictionary file
const dictionaryUrl = 'https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/500-worst-passwords.txt';

// Download and perform the dictionary attack
https.get(dictionaryUrl, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const words = data.split('\n');
    for (const word of words) {
      const hash = crypto.createHash('md5').update(word.trim()).digest('hex');
      if (hash === targetHash) {
        console.log(`Bob's password is: ${word.trim()}`);
        break;
      }
    }
  });
}).on('error', (err) => {
  console.error('Error downloading dictionary:', err);
});
