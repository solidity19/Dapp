// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Register {
    string info;
    mapping(address => Users) username;
    address[] public addressIndices;
    struct Users { 
      string name;
      bool available;
   }
   modifier alreadyPresent {
    require(username[msg.sender].available == false);
    _;
}
    uint totalValue;
    string d = "User Name Already exist";
    function setInfo(string memory _info) public alreadyPresent returns(string memory) {
        //info = _info;
        uint arrayLength = addressIndices.length;
        // totalValue auto init to 0
        
        for (uint i=0; i<arrayLength; i++) {
            if(keccak256(bytes(_info)) == keccak256(bytes(username[addressIndices[i]].name))){
                return d;
                
            }
           
        
    }
        addressIndices.push(msg.sender);

        username[msg.sender].available = true;
         username[msg.sender].name = _info;
        return _info;
    }

    function getInfo() public view returns (string memory) {
        return username[msg.sender].name;
    }
}
