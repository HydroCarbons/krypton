const { Krypton } = require("../src/index.js");
const assert = require('assert');
const fs = require('fs');

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

var dataSet = [
    { name: "Object", data: { key: "Value" } },
    { name: "String", data: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
    { name: "Number", data: 12345678901234567890 },
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
});

////////////////////////////////////////////////////////////////////////////////
