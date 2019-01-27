const { Krypton } = require("../src/index.js");
const assert = require('assert');
const fs = require('fs');
const path = require("path");
////////////////////////////////////////////////////////////////////////////////
function AsyncTest(Krypton, data) {
  //console.log("Async encryption");
  Krypton.encryptAsync(data).then(result => {
    //console.log("Async decryption", result);
    Krypton.decryptAsync().then(result=>{
      //console.log("Result:", result);
      assert.deepEqual(result, data);
      console.log("Async Passed");
    });
  });
}
////////////////////////////////////////////////////////////////////////////////
function SyncTest(Krypton, data, expectedValue) {
  //console.log("Sync encryption");
    Krypton.encrypt(data);

  //console.log("Sync decryption");
  var result = Krypton.decrypt();
    //console.log("Result:", result);
    assert.deepEqual(result, data);
    console.log("Sync Passed");
}
////////////////////////////////////////////////////////////////////////////////
function AsymmetricTest(Krypton, data) {
  var pubKey = path.resolve("./keys/public.cert.pem");
  var privateKey = path.resolve("./keys/private.key.pem");

  var client_request = "Client_request, Session_key_";// + JSON.stringify(data);
  console.log("[Client] Client is encrypting the client_request and will be sending it to server... ");
  encrypted_data = Krypton.encryptWithRSAPrivateKey( client_request, privateKey );
  console.log("\t[Client] Encrypted client request :", encrypted_data);

  console.log("[Server] Server decrypting client_request received from client");
  var decrypted_data = Krypton.decryptWithRSAPublicKey(encrypted_data, pubKey);
  console.log("\t[Server] Decrypted client_request :", decrypted_data);

  var server_response = "Server_response, Code_" + "OK_".repeat("10");
  console.log("[Server] Server encrypting the server_response");
  encrypted_data = Krypton.encryptWithRSAPublicKey(server_response, pubKey);
  console.log("\t[Server] Encrypted server_response :", encrypted_data);

  console.log("[Client] Client encrypting server_response received from server");
  decrypted_data = Krypton.decryptWithRSAPrivateKey(encrypted_data, privateKey);
  console.log("\t[Client] Decrypted server_response :", decrypted_data);
}
////////////////////////////////////////////////////////////////////////////////
var dataSet = [
    { name: "Object", data: { key: "Value" } },
    { name: "String", data: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
    { name: "Number", data: 123456 },
    { name: "Array of Numbers", data: [10,20,30,40,50,60,70,80,90,100] },
    { name: "Array of Objects", data: [
        { name: "NJ", age: 41, city: "New Jersey" },
        { name: "JKF", age: 45, city: "New York" }
    ]},
    { name: "File", data: fs.readFileSync('./LICENSE', "utf8").toString() },
    { name: "Empty array", data: [] },
    { name: "Empty object", data: {} },
    { name: "Null Test", data: null }
];

let outputDirectory = "./data";
fs.mkdirSync(outputDirectory, {recursive:true});

dataSet.forEach(item => {
  console.log("\nTest :", item.name);

  var krypton = new Krypton("./data/" + item.name + ".encrypted", "HydroCarbons123456+-[]!@#$%^");
    AsyncTest(krypton, item.data);
    SyncTest(krypton, item.data);
    //AsymmetricTest(krypton, item.data);
});


////////////////////////////////////////////////////////////////////////////////
