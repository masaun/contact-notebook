pragma solidity ^0.5.0;


contract ContactNotebook {

	struct Contact {
		string name;
		address contactAddress;
	}
	Contact[] contacts;


	/* 連絡先の新規作成 */ 
	function createContact(string _name, address _address) public returns (bool) {
		Contact memory contact = Contact({
			name: _name,
			contactAddress: _address
		});
		contacts.push(contact);

		return true
	}


	/* 連絡先の一覧取得 */ 
	function getAllContact() public view returns (string name, address contactAddress) {
		Contact memory contacts

		for (uint i=0; i < contacts.length; i++) {
			name = contacts[i].name;
			contactAddress = contacts[i].contactAddress;
		}

		return name, contactAddress;
	}
	

	/* 連絡先の個別取得 */ 
	// function getContact () returns(bool res) internal {
		
	// }	
}
