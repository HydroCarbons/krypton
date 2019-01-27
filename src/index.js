////////////////////////////////////////////////////////////////////////////////
// Krypton - Generic crypto class
// Author: HydroCarbons@outlook.com
////////////////////////////////////////////////////////////////////////////////

const FS = require("fs");
const Crypto = require("crypto");

////////////////////////////////////////////////////////////////////////////////

const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const UTF_8 = "utf8";
const BASE_64 = "base64";

////////////////////////////////////////////////////////////////////////////////
function IsEmpty(obj) {
  if(obj === null || typeof(obj) === 'undefined') return true;
  return false;
}
////////////////////////////////////////////////////////////////////////////////
class Krypton {

    constructor(filePath, passKey) {
      this.filePath = filePath;
      this.passKey = passKey;
      this.ENCRYPTION_KEY = Buffer.concat([Buffer.from(passKey)], KEY_LENGTH);
    }

    encryptAsync(data) {
      return new Promise((resolve, reject) => {
        let encrypted_data;
          try {
              if( IsEmpty(data) ) return;
              let iv = Crypto.randomBytes(IV_LENGTH);
              //console.log( "Initialization Vector ", iv );
              var cipher = Crypto.createCipheriv(
                'aes-256-cbc',
                new Buffer.from(this.ENCRYPTION_KEY),
                iv
              );
              let encrypted = cipher.update(JSON.stringify(data));
              encrypted = Buffer.concat([encrypted, cipher.final()]);
              encrypted_data = iv.toString('hex') + ':' + encrypted.toString('hex');
              FS.writeFile(this.filePath, encrypted_data, error => {
                  if(error) {
                      reject(error)
                  }
                  resolve({ message: "Encrypted!" });
              });
          } catch (exception) {
              reject({ message: exception.message });
          }
      });
    }

    encrypt(data) {
      try {
          if( IsEmpty(data) ) return;
          let encrypted_data;
          let iv = Crypto.randomBytes(IV_LENGTH);
          //console.log( "Initialization Vector ", iv );
          var cipher = Crypto.createCipheriv(
            'aes-256-cbc',
            new Buffer.from(this.ENCRYPTION_KEY),
            iv
          );
          let encrypted = cipher.update( JSON.stringify(data) );
          encrypted = Buffer.concat([encrypted, cipher.final()]);
          encrypted_data = iv.toString('hex') + ':' + encrypted.toString('hex');
          FS.writeFileSync(this.filePath, encrypted_data);
          return { message: "Encrypted!" };
      } catch (exception) {
          return null;
          //throw new Error(exception.message);
      }
    }

    decryptAsync() {
      return new Promise((resolve, reject) => {
          FS.readFile(this.filePath, (error, data) => {
              if(error) {
                  reject(error);
              }
              try {
                FS.readFile(this.filePath, (err, data) => {
                    if (err) throw err;
                    let textParts = data.toString().split(':');
                    let iv = new Buffer.from(textParts.shift(), 'hex');
                    let encryptedText = new Buffer.from(textParts.join(':'), 'hex');
                    let decipher = Crypto.createDecipheriv('aes-256-cbc', new Buffer.from(this.ENCRYPTION_KEY), iv);
                    let decrypted = decipher.update(encryptedText);
                    decrypted = Buffer.concat([decrypted, decipher.final()]);
                    resolve(JSON.parse(decrypted.toString()));
                });
              } catch (exception) {
                  reject({ message: exception.message });
              }
          });
      });
    }

    decrypt() {
      try {
        var data = FS.readFileSync(this.filePath).toString();
        if( IsEmpty(data) ) return;

        let textParts = data.split(':');
        let iv = new Buffer.from( textParts.shift(), 'hex' );
        let encryptedText = new Buffer.from( textParts.join(':'), 'hex' );
        let decipher = Crypto.createDecipheriv('aes-256-cbc', new Buffer.from(this.ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return JSON.parse( decrypted.toString() );
      } catch (exception) {
          return null;
          //throw new Error(exception.message);
      }
    }

    // Asymmetric Encryption/Decryption
    //
    // Server TX >> Client
    // Server encrypts the data with Public Key
    encryptWithRSAPublicKey(data, path2PublicKey) {
        var publicKey = FS.readFileSync( path2PublicKey , UTF_8);
        var buffer = new Buffer.from(data);
        var encrypted = Crypto.publicEncrypt(publicKey, buffer);

        return encrypted.toString(BASE_64);
    }

    // >> Server Rx
    // Server decrypts the data with public Key
    decryptWithRSAPublicKey(data, path2PublicKey) {
        var publicKey = FS.readFileSync( path2PublicKey , UTF_8);
        var buffer = new Buffer.from(data, BASE_64);
        var decrypted = Crypto.publicDecrypt(publicKey, buffer);
        return decrypted.toString(UTF_8);
    }

    // >> Client Rx
    // Client decrypts the data with private Key
    decryptWithRSAPrivateKey(data, path2PrivateKey) {
        var privateKey = FS.readFileSync( path2PrivateKey , UTF_8);
        var buffer = new Buffer.from(data, BASE_64);
        var decrypted = Crypto.privateDecrypt(privateKey, buffer);
        return decrypted.toString(UTF_8);
    }

    // Client TX >> Server
    // Client encrypts the data with private Key
    encryptWithRSAPrivateKey(data, path2PrivateKey) {
        var privateKey = FS.readFileSync( path2PrivateKey , UTF_8);
        var buffer = new Buffer.from(data);
        var encrypted = Crypto.privateEncrypt(privateKey, buffer);
        return encrypted.toString(BASE_64);
    }
}
////////////////////////////////////////////////////////////////////////////////

module.exports = {Krypton};
////////////////////////////////////////////////////////////////////////////////
