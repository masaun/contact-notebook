pragma solidity ^0.5.0;


contract ContactNotebook {

	struct Contact {
		string name;
		address contactAddress;
	}
	Contact[] public contacts;


	/* 連絡先の新規作成 */ 
	function createContact(string memory _name, address _address) public returns (uint256 id) {
		Contact memory contact = Contact({
			name: _name,
			contactAddress: _address
		});
		contacts.push(contact);

		uint256 id;
		id = contacts.length - 1;

		return id;
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
	

	/* 連絡先の個別取得 */ 
	function getContact(uint256 _id) public view returns (string memory name, address contactAddress) {

		require (_id < contacts.length - 1, "id is less than number of contact list");
		
		Contact memory contact = contacts[_id];

		name = contacts[_id].name;
		contactAddress = contacts[_id].contactAddress;

		return (name, contactAddress);
	}	
}
