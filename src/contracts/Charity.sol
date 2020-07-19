pragma solidity ^0.5.0;

contract Charity{
    //Name of the charity
    string public name;
    //Address of the account which created this Charity Contract
    address public charityOwner;

    //Mapping to store total amount donated by an account
    mapping(address => uint256) donationAmount;

    //Modifier to only allow owner to perform a function
    modifier onlyOwner{
        require(msg.sender == charityOwner,"Can only be done by charity owner");
        _;
    }
    //Constructor sets charity name and owner address
    constructor(string memory _name, address _msgsender) public{
        charityOwner = _msgsender;
        name = _name;
    }
    function donate() public payable{
        donationAmount[msg.sender] += msg.value;
    }
    function allocate(address payable _addr, uint256 _amount) public onlyOwner{
        _addr.transfer(_amount);
    }
}