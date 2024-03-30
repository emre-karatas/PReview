var getRandomValues = function(byteArray) {
    var bytes = crypto.rng.randomBytes(byteArray.length);
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = bytes[i];
    }
  };

global.crypto = { getRandomValues };

global.crypto = require('crypto');
global.crypto.getRandomValues = getRandomValues;