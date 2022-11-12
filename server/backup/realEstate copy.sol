// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

// Parent - supposedly 
contract Ownable {
    address private _owner;

    modifier onlyOwner  {
        require(msg.sender == _owner,"Only the owner can run this function.");
        _;
    }
    constructor () {
        _owner = msg.sender;
    }
    function changeOwner(address newOwner) public onlyOwner {
        _owner = newOwner;
    }
    function owner() public view returns(address) {
        return _owner;
    }

}

/*contract AccessControl is Ownable {
    event GrantRole(bytes32 indexed role, address indexed account);
    event RevokeRole(bytes32 indexed role, address indexed account);

    mapping(bytes32 => mapping(address => bool)) public roles;
    bytes32 public constant GOVERMENT = keccak256(abi.encodePacked("GOVERMENT"));
    bytes32 public constant BUYER = keccak256(abi.encodePacked("BUYER"));
    bytes32 public constant SELLER = keccak256(abi.encodePacked("SELLER"));

    function _grantRole(bytes32 _role, address _account) internal {
        roles[_role][_account] = true;
        emit GrantRole(_role, _account);
    }

    modifier onlyRole(bytes32 _role) {
        require(roles[_role][msg.sender], "Not authorization!");
        _;
    }

    function grantRole(bytes32 _role, address _account) external {
        _grantRole(_role, _account);
    }
}*/


contract AccessControl is Ownable {
    uint rolesCounter;
    mapping (address => Roles) userRoles;

    enum Roles {
        GOVERMENT,
        BUYER,
        SELLER
    }

    function grantRole(address payable _address, Roles role) 
    onlyOwner
    external {
        userRoles[_address] = role;
        rolesCounter++;
    }

    modifier requireBuyer(address payable _address) {
        require(userRoles[_address] == Roles.BUYER, "Not Authorizied!");
        _;
    }

     modifier requireSeller(address payable _address) {
        require(userRoles[_address] == Roles.SELLER, "Not Authorizied!");
        _;
    }

     modifier requireGoverment(address payable _address) {
        require(userRoles[_address] == Roles.GOVERMENT, "Not Authorizied!");
        _;
    }
}

contract realEsate is AccessControl {
    address payable user;
    uint usersCounter;
    
    mapping (address => uint) usersMap;
    mapping (address => uint) landlordsPropertyCounter;
    mapping (address => mapping(uint => Property)) landlordProperties;

    struct Property { 
        uint propertyId;
        string streetName;
        uint area;
        uint apartmentNum;
        uint listedPrice;
        bool valid; 
        properyStatus propStatus;
    }

    enum properyStatus {
        uninitialized,
        agreementStarted,
        agreementInProgress,
        agreementCompleted
    }

    

    event UserAdded(address payable _address, uint _counter, bool isGoverment, bool isBuyer, bool isSeller);

     /*  @dev - adds a new landlord to the mapping of landlords && landlordCounter++
        @filters - onlyOwner, landlordDoesNotExist 
        @params - landlordAddress
    */ 
    function addLandlord (address payable _landlordAddress) 
    public 
    onlyOwner
    userDoesNotExist(_landlordAddress)
    {
        landlordsPropertyCounter[_landlordAddress] = 0;
        usersCounter++;
        usersMap[_landlordAddress] = usersCounter;
        emit UserAdded(_landlordAddress, usersCounter, false, false, true);
    }

    modifier userDoesNotExist(address payable _userAddress) {
        require(usersMap[_userAddress] == 0, "User already exists!");
        _;
    }

}

