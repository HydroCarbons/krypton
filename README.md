![Krypton Icon](https://raw.githubusercontent.com/HydroCarbons/krypton/master/krypton-256.png)

## Travis CI
[![Build Status](https://travis-ci.com/HydroCarbons/krypton.svg?branch=master)](https://travis-ci.com/HydroCarbons/krypton)

# Krypton
- **Krypton** is a JavaScript class with Symmetric (asynchronous and synchronous) and Asymmetric encryption and decryption methods. **Cipher** is configured to use **AES-256-CBC** with initialization vector.

## Usage

### Install
` npm install Krypton-js `

### Require
```javascript
const { Krypton } = require("krypton-js")
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
Krypton.encryptAsync(data).then(result=>{ ... })
// Result = { message: "Encrypted!" }
```

### Decrypt Asynchronous
```javascript
Krypton.decryptAsync(data).then(decryptedData=>{ ... })
//
```

## Asymmetric Encryption/decryption

### A exchanges its public key with B
### A sends data to B, where encryption of data is done with A's Private Key
```javascript
encrypted_data = Krypton.encryptWithRSAPrivateKey( client_request, privateKey )
```

### B: data decryption with A's public Key
```javascript
decrypted_data = Krypton.decryptWithRSAPublicKey(encrypted_data, pubKey)
```
### B to A, encryption with A's public Key
```javascript
encrypted_data = Krypton.encryptWithRSAPublicKey(server_response, pubKey)
```

### A, decryption with A's private Key
```javascript
decrypted_data = Krypton.decryptWithRSAPrivateKey(encrypted_data, privateKey)
```

### Generate a public and private RSA key pair
```javascript
1. ssh-keygen -t rsa
2. openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

## Library Usage/Test
### Try it out
` npm install `

### Test
` npm run test `

### Coverage
` istanbul cover test `

Check coverage folder
