pragma solidity ^0.5.0;
import './Charity.sol';

contract CharityHandler{
    string public name = 'Charity Handler';

    //mapping of owner addresses to charity contract addresses
    mapping(address => address[]) public ownerCharities;

    //array of all charity contract addresses
    Charity[] public allCharities;
    function createCharity(string memory cname) public {
        Charity c = new Charity(cname, msg.sender);
        allCharities.push(c);
        ownerCharities[msg.sender].push(address(c));
    }
    function getAllCharityAddress() public view returns(Charity[] memory){
        return allCharities;
    }
    function getOwnedCharities() public view returns(address[] memory){
        return ownerCharities[msg.sender];
    }
}