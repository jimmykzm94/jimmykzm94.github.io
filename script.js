// http://www.darrenbeck.co.uk/blockchain/nodejs/nodejscrypto/
// https://blockchaindemo.io/
// refer these website


const crypto = require('crypto');

var button = document.querySelector("button");
var container = document.getElementById("container");
var input = document.querySelector("input");

//This is brewchain
const BrewChain = function() {
  let chain = [];
  let currentBlock = {};
  let genesisBlock = {};

  function init() {
    genesisBlock = {
      index: 0,
      timestamp: new Date().getTime(),
      data: 'our genesis data',
      previousHash: "-1",
      nonce: 0
    };

    genesisBlock.hash = createHash(genesisBlock);
    chain.push(getValidHash(genesisBlock));
    currentBlock = genesisBlock;
  }

  function createHash({
    index , previousHash , timestamp , data , nonce
  }) {
    return crypto.createHash('SHA256').update(index + previousHash + timestamp + data + nonce).digest('hex');
  }

  function addToChain(block) {
    if (checkNewBlockIsValid(block, currentBlock)) {
      chain.push(block);
      currentBlock = block;
      return true;
    }

    return false;
  }

  function createBlock(data) {
    let newBlock = {
      timestamp: new Date().getTime(),
      data: data,
      index: currentBlock.index + 1,
      previousHash: currentBlock.hash,
      nonce: 0
    };

    newBlock.hash = createHash(newBlock);

    return getValidHash(newBlock);
  }

  function getValidHash(block){
    while(!isValidHashDifficulty(block.hash)){
      block.timestamp= new Date().getTime();
      block.nonce++;
      block.hash = createHash(block);
    }
    return block;
  }

  function getLatestBlock() {
    return currentBlock;
  }

  function getTotalBlocks() {
    return chain.length;
  }

  function getChain() {
    return chain;
  }

  function checkNewBlockIsValid(block, previousBlock) {
    if (previousBlock.index + 1 !== block.index) {
      //Invalid index
      return false;
    } else if (previousBlock.hash !== block.previousHash) {
      //The previous hash is incorrect
      return false;
    } else if (!hashIsValid(block)) {
      //The hash isn't correct
      return false;
    }

    return true;
  }

  function hashIsValid(block) {
    return (createHash(block) == block.hash);
  }

  function isValidHashDifficulty(hash) {
    let difficulty = 3;
    for (var i = 0; i < hash.length; i++) {
      if (hash[i] !== "0") {
        break;
      };
    }
    return i >= difficulty;
  }

  return {
    init,
    createBlock,
    addToChain,
    checkNewBlockIsValid,
    getLatestBlock,
    getTotalBlocks,
    getChain
  }
};
//end
let myBrew = new BrewChain();
myBrew.init();
document.getElementById("first").innerHTML="Genesis Block";
document.getElementById("second").innerHTML="Previous Hash: "+myBrew.getLatestBlock().previousHash;
document.getElementById("third").innerHTML="Hash: "+myBrew.getLatestBlock().hash;
document.getElementById("fourth").innerHTML="Nonce: "+myBrew.getLatestBlock().nonce;
document.getElementById("fifth").innerHTML="Data: "+myBrew.getLatestBlock().data;
document.getElementById("sixth").innerHTML="Timestamp: "+myBrew.getLatestBlock().timestamp;

function addDiv() {
  if (input.value.length > 0) {
    var first = document.createElement("div");
    var second = document.createElement("div");
    var third = document.createElement("div");
    var fourth = document.createElement("div");
    var fifth = document.createElement("div");
    var sixth = document.createElement("div");

    var h1 = document.createElement("h1");
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    var p4 = document.createElement("p");
    var p5 = document.createElement("p");

    myBrew.addToChain(myBrew.createBlock(input.value));
    // myBrew.addToChain(myBrew.createBlock('The 2nd block'));

    var word1 = document.createTextNode("Block #"+myBrew.getLatestBlock().index);
    var word2 = document.createTextNode("Previous Hash: "+myBrew.getLatestBlock().previousHash);
    var word3 = document.createTextNode("Hash: "+myBrew.getLatestBlock().hash);
    var word4 = document.createTextNode("Nonce: "+myBrew.getLatestBlock().nonce);
    var word5 = document.createTextNode("Data: "+input.value);
    var word6 = document.createTextNode("Timestamp: "+myBrew.getLatestBlock().timestamp);

    var div = document.createElement("div");
    var classAtr = document.createAttribute("class");
    classAtr.value = "division rounded col-sm";
    div.setAttributeNode(classAtr);

    var idAtr = document.createAttribute("id");
    idAtr.value = "first";
    h1.setAttributeNode(idAtr);

    h1.appendChild(word1);
    p1.appendChild(word2);
    p2.appendChild(word3);
    p3.appendChild(word4);
    p4.appendChild(word5);
    p5.appendChild(word6);
    first.appendChild(h1);
    second.appendChild(p1);
    third.appendChild(p2);
    fourth.appendChild(p3);
    fifth.appendChild(p4);
    sixth.appendChild(p5);

    div.appendChild(first);
    div.appendChild(second);
    div.appendChild(third);
    div.appendChild(fourth);
    div.appendChild(fifth);
    div.appendChild(sixth);

    container.appendChild(div);

    input.value = "";
  }
}

function buttonClick(){
  if (input.value.length > 0){
    addDiv();
  }
}

function keypress(event){
  if (input.value.length > 0 && event.keyCode===13){
    addDiv();
  }
}

button.addEventListener("click", buttonClick);
input.addEventListener("keypress",keypress)
