pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";


contract ContactNotebook is Initializable {

	struct Contact {
		string name;
		address contactAddress;
	}
	Contact[] public contacts;

	/* Event */ 
	event CreatedContact(string indexed _name, address indexed _address);
	event RemovedContact(uint256 indexed id);
	

	/* Constructor */ 
	function initialize(uint256 _testNum) public initializer {
		uint256 testNum;
		testNum = _testNum;
	}


	/* 連絡先の新規作成 */ 
	function createContact(string memory _name, address _address) public returns (uint256 id) {
		Contact memory contact = Contact({
			name: _name,
			contactAddress: _address
		});
		contacts.push(contact);

		uint256 id;
		id = getNumberOfContact() - 1;  // Reference getNumberOfContact function which is written below
		//id = contacts.length - 1;
		
		emit CreatedContact(_name, _address);

		return id;
	}


	/* 連絡先一覧の総数を取得 */ 
	function getNumberOfContact() public view returns (uint256) {
		return contacts.length;
	}


	/* 連絡先の個別取得 */ 
	function getContact(uint256 _id) public view returns (string memory name, address contactAddress) {

		require (_id < contacts.length, "id is less than number of contact list");
		
		Contact memory contact = contacts[_id];

		name = contacts[_id].name;
		contactAddress = contacts[_id].contactAddress;

		return (name, contactAddress);
	}


	/* Remove contact */
	function removeContact(uint256 _id) public returns (bool) {
		require (getNumberOfContact() > 0, "contact does not exist");
		require (_id < contacts.length, "id is less than number of contact list");

		Contact memory contact = contacts[_id];
		delete contact;

		emit RemovedContact(_id);

		return true;
	}
	



	/* 連絡先の一覧取得 */ 
	// function getAllContact() public view returns (string _name, address _contactAddress) {

	// 	string _name;
	// 	address _contactAddress;

	// 	Contact memory contacts;

	// 	for (uint i=0; i < contacts.length; i++) {
	// 		_name = contacts[i].name;
	// 		_contactAddress = contacts[i].contactAddress;
	// 	}

	// 	return (_name, _contactAddress);
	// }
}
