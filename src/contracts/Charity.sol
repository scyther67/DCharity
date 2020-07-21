pragma solidity ^0.5.0;

contract Charity{
    //Name of the charity
    string public name;
    string public description;
    //Address of the account which created this Charity Contract
    address public charityOwner;

    struct Donation{
        bytes32 details;
        uint amount;
        uint amountRequired;
        address payable recipient;
    }
    Donation[] public completedDonationRequests;
    Donation[] public donationRequests;
    //Mapping to store total amount donated by an account
    mapping(address => uint256) public donationAmount;

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
    // function donate() public payable{
        // donationAmount[msg.sender] += msg.value;
    // }
    function getAllDonationRequests() public view returns (bytes32[] memory, uint[] memory, uint[] memory, address[] memory){
        bytes32[] memory _details = new bytes32[](donationRequests.length);
        uint[]  memory _amount = new uint[](donationRequests.length);
        uint[]  memory _amountRequired = new uint[](donationRequests.length);
        address[] memory _recipient = new address[](donationRequests.length);
        for (uint i = 0; i < donationRequests.length; i++) {
            Donation storage donation = donationRequests[i];
            _details[i] = donation.details;
            _amount[i] = donation.amount;
            _amountRequired[i] = donation.amountRequired;
            _recipient[i] = donation.recipient;
        }
        return (_details, _amount, _amountRequired, _recipient);
    }
    function getAllCompletedDonationRequests() public view returns (bytes32[] memory, uint[] memory, uint[] memory, address[] memory){
        bytes32[] memory _details = new bytes32[](completedDonationRequests.length);
        uint[]  memory _amount = new uint[](completedDonationRequests.length);
        uint[]  memory _amountRequired = new uint[](completedDonationRequests.length);
        address[] memory _recipient = new address[](completedDonationRequests.length);
        for (uint i = 0; i < completedDonationRequests.length; i++) {
            Donation storage donation = completedDonationRequests[i];
            _details[i] = donation.details;
            _amount[i] = donation.amount;
            _amountRequired[i] = donation.amountRequired;
            _recipient[i] = donation.recipient;
        }
        return (_details, _amount, _amountRequired, _recipient);
    }
    function getSingleDonationRequest(uint index) public view returns (bytes32, uint, uint, address) {
    Donation storage d = donationRequests[index];

    return (d.details, d.amount, d.amountRequired, d.recipient);
}
    function getDonationRequestLength() public view returns(uint){
        return donationRequests.length;
    }
    function getCompletedDonationRequestLength() public view returns(uint){
        return completedDonationRequests.length;
    }
    function createDonationRequest(bytes32 _details, uint _amountRequired, address payable _recipent) public onlyOwner{
        Donation memory d = Donation({
            details:_details,
            amount:_amountRequired,
            amountRequired:_amountRequired,
            recipient:_recipent
        });
        donationRequests.push(d);
    }
    function transferOwnership(address _newOwner) public onlyOwner{
        charityOwner = _newOwner;
    }
    function donateToRequest(uint _index) public payable{
        require(_index < donationRequests.length,"Request does not exist at specified index");
        Donation storage d = donationRequests[_index];
        require(msg.value<=d.amountRequired,"Transfer amount excceeds required amount");
        d.amountRequired -= msg.value;
        donationAmount[msg.sender] += msg.value;
        if(d.amountRequired == 0)
        {
            d.recipient.transfer(d.amount);
            completedDonationRequests.push(donationRequests[_index]);
            donationRequests[_index] = donationRequests[donationRequests.length-1];
            donationRequests.length--;
        }
    }
    // function allocate(address payable _addr, uint256 _amount) public onlyOwner{
        // _addr.transfer(_amount);
    // }
}