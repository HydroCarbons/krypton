![Krypton Icon](https://github.com/HydroCarbons/krypton/blob/master/krypton-256.png)

# Krypton
- **Krypton** is a javascript class with asynchronous and synchronous encryption and decryption methods. **Cipher** is configured to use **AES-256-CBC** with initialization vector.

## Usage

### Install
` npm install Krypton-js `

### Require
```javascript
const { Krypton } = require("krypton-js");
```
### Create an instance of Krypton and pass encryptionFileName and Password
```javascript
let Krypton = new Krypton(encryptionFileName, Password)
```

### Encrypt Synchronous
```javascript
Krypton.encrypt(data)
```

### Decrypt Synchronous
```javascript
data = Krypton.decrypt()
```

### Encrypt Asynchronous
```javascript
Krypton.encryptAsync(data).then(result=>{ ... });
// Result = { message: "Encrypted!" }
```

### Decrypt Asynchronous
```javascript
Krypton.decryptAsync(data).then(decryptedData=>{ ... });
//
```

## Library Usage/Test
### Try it out
` npm install `

### Test
` npm run test `

### Coverage
` istanbul cover test `

Check coverage folder
