// Source code to interact with smart contract

// web3 provider with fallback for old version
if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    try {
        // ask user for permission
        ethereum.enable()
        // user approved permission
    } catch (error) {
        // user rejected permission
        console.log('user rejected permission')
    }
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    // no need to ask for permission
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
  console.log (window.web3.currentProvider)
  
  // contractAddress and abi are setted after contract deploy
  var contractAddress = '0xe2E6a0981B9DC9D24f739e7Fd47f47156E14d1D6';
  var abi = JSON.parse( '[{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"addressIndices","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInfo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_info","type":"string"}],"name":"setInfo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"}]' );
  
  //contract instance
  contract = new web3.eth.Contract(abi, contractAddress);
  
  // Accounts
  var account;
  
  web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
  });
  
  //Smart contract functions
  function registerSetInfo() {
    info = $("#newInfo").val();
    contract.methods.setInfo (info).send( {from: account}).then( function(tx) { 
      console.log("Transaction: ", tx); 
    });
    $("#newInfo").val('');
  }
  
  function registerGetInfo() {
    contract.methods.getInfo().call({from: account}).then( function( info ) { 
      console.log("info: ", info);
      document.getElementById('lastInfo').innerHTML = info;
    });    
  }