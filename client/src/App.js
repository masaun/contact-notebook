import React, { Component } from "react";

import getWeb3, { getGanacheWeb3 } from "./utils/getWeb3"; // import web3

import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Hero from "./components/Hero/index.js";
import Web3Info from "./components/Web3Info/index.js";
import CounterUI from "./components/Counter/index.js";
import Wallet from "./components/Wallet/index.js";
import ContactNotebook from "./components/ContactNotebook/index.js";  // Load component of ContactNotebook
import Instructions from "./components/Instructions/index.js";
import { Loader } from 'rimble-ui';

import styles from './App.module.scss';

class App extends Component {
  // state = {
  //   storageValue: 0,
  //   web3: null,
  //   accounts: null,
  //   contract: null,
  //   route: window.location.pathname.replace("/",""),
  // };


  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
      route: window.location.pathname.replace("/",""),
      contactName: '佐藤',             // For onNameChange
      contactAddress: '',   // For onContactAddress
      contactLists: []
    }
    // add
    this.onNameChange = this.onNameChange.bind(this);
    this.onContactAddressChange = this.onContactAddressChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  }


  /* It is set every time */ 
  componentDidMount = async () => {
    let Counter = {};
    let Wallet = {};
    let ContactNotebook = {};  // Define variable of ContactNotebook
    try {
      Counter = require("./contracts/Counter.json");
      Wallet = require("./contracts/Wallet.json");
      ContactNotebook = require("./contracts/ContactNotebook.json");  // Load ABI of contract of ContactNotebook
    } catch (e) {
      console.log(e);
    }
    try {
      const isProd = process.env.NODE_ENV === 'production';
      if (!isProd) {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        let ganacheAccounts = [];
        try {
          ganacheAccounts = await this.getGanacheAddresses();
        } catch (e) {
          console.log('Ganache is not running');
        }
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const isMetaMask = web3.currentProvider.isMetaMask;
        let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]): web3.utils.toWei('0');
        balance = web3.utils.fromWei(balance, 'ether');
        let instance = null;
        let instanceWallet = null;
        let instanceContactNotebook = null;  // This instance is contract of ContactNotebook
        let deployedNetwork = null;
        if (Counter.networks) {
          deployedNetwork = Counter.networks[networkId.toString()];
          if (deployedNetwork) {
            instance = new web3.eth.Contract(
              Counter.abi, // This ABI is contract of Counter
              deployedNetwork && deployedNetwork.address,
            );
          }
        }
        if (Wallet.networks) {
          deployedNetwork = Wallet.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceWallet = new web3.eth.Contract(
              Wallet.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('instance', instance); // debug
            console.log('instanceWallet', instanceWallet); // debug
          }
        }
        if (ContactNotebook.networks) {
          deployedNetwork = ContactNotebook.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceContactNotebook = new web3.eth.Contract(
              ContactNotebook.abi, // This ABI is contract of ContactNotebook
              deployedNetwork && deployedNetwork.address,
            );
            console.log('instanceContactNotebook', instanceContactNotebook); // debug
          }
        }

        // Set state of infomation of Web3 and Ganache to each instance
        if (instance || instanceWallet || instanceContactNotebook) {
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId,
            isMetaMask, contract: instance, wallet: instanceWallet, NumContact: instanceContactNotebook }, () => {
              this.refreshValues(instance, instanceWallet, instanceContactNotebook);
              setInterval(() => {
                this.refreshValues(instance, instanceWallet, instanceContactNotebook);
              }, 5000);
            });
        }
        else {
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, isMetaMask });
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  refreshValues = (instance, instanceWallet, instanceContactNotebook) => {
    if (instance) {
      this.getCount();
    }
    if (instanceWallet) {
      this.updateTokenOwner();
    }
    if (instanceContactNotebook) {
      this.getNumOfContact();
    }
  }

  getCount = async () => {
    const { contract } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getCounter().call();
    // Update state with the result.
    this.setState({ count: response });
  };

  updateTokenOwner = async () => {
    const { wallet, accounts } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await wallet.methods.owner().call();
    // Update state with the result.
    this.setState({ tokenOwner: response.toString() === accounts[0].toString() });
  };

  /* Call getNumberOfContact function in contract of ContactNotebook */
  getNumOfContact = async () => {
    const { contract } = this.state;    // assign this.state to variable which is empty（Don't use）
    const { NumContact } = this.state;  // assign this.state to variable which is empty
    console.log('contractの中身', contract)      // Debug（Don't use）
    console.log('NumContactの中身', NumContact)  // Debug

    const response = await  NumContact.methods.getNumberOfContact().call();
    this.setState({ numberOfContact: response })  // Update state with the result（and append into this.state）

    console.log('response of getNumberOfContact', response)  // Debug
  };

  /* Send value to createContact function in contract of ContactNotebook */
  createContact = async (name, address) => {
    const { accounts, NumContact, contactName, contactAddress } = this.state;
    //const { accounts, NumContact } = this.state;
    const response = await NumContact.methods.createContact(name, address).send({ from: accounts[0] });
    //this.setState({ createNewContact: response });
    this.setState({ createNewContact_transactionHash: response.transactionHash });  // Get Tx hash which is created new contact

    console.log('response of createContact', response)  // Debug
    console.log('response of transactionHash of createContact', response.transactionHash)  // Debug
  }

  onNameChange(event) {
    this.setState({ contactName: event.target.value })
    console.log('onNameChange', event.target.value)  // Debug
  }

  onContactAddressChange(event) {
    this.setState({ contactAddress: event.target.value })
    console.log('onContactAddress', event.target.value)  // Debug
  }  


  // onSubmit() {
  //   this.state.web3.eth.getAccounts((error, accounts) => {
  //     postToken.deployed().then((instance) => {
  //       postTokenInstance = instance
  //       return postTokenInstance.mint(this.state.title, this.state.content, {from: accounts[0], gas: 1000000})
  //   })
  // }

  onSubmit(event) {
    console.log(this.state);  // Debug
  }

  submit() {
    const { value } = this.state;
    this.setState({
      name: '',
      contactAddress: value
    });
  }

  /* Call getContact function in contract of ContactNotebook */
  getContact = async (id) => {
    const { NumContact } = this.state;
    const response = await NumContact.methods.getContact(id).call();
    this.setState({ getIndividualContact: response });
    this.setState({ getIndividualContact_name: response.name });
    this.setState({ getIndividualContact_contactAddress: response.contactAddress });

    console.log('response of getContact', response)                 // Debug
    console.log('response of name by called getContact function', response.name)            // Debug
    console.log('response of contactAddress by called getContact function', response.contactAddress)  // Debug
  }

  /* Call removeContact function in contract of ContactNotebook */ 
  removeContact = async (id) => {
    const { accounts, NumContact } = this.state;
    const response = await NumContact.methods.removeContact(id).send({ from: accounts[0] })
    this.setState({ RemoveContact_transactionHash: response.transactionHash });  // Get Tx hash which is created new contact
    console.log('response of removeContact', response);
  }  


  increaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.increaseCounter(number).send({ from: accounts[0] });
    this.getCount();
  };

  decreaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.decreaseCounter(number).send({ from: accounts[0] });
    this.getCount();
  };

  renounceOwnership = async (number) => {
    const { accounts, wallet } = this.state;
    await wallet.methods.renounceOwnership().send({ from: accounts[0] });
    this.updateTokenOwner();
  };


  renderLoader() {
    return (
      <div className={styles.loader}>
        <Loader size="80px" color="red" />
        <h3> Loading Web3, accounts, and contract...</h3>
        <p> Unlock your metamask </p>
      </div>
    );
  }

  renderDeployCheck(instructionsKey) {
    return (
      <div className={styles.setup}>
        <div className={styles.notice}>
          Your <b> contracts are not deployed</b> in this network. Two potential reasons: <br />
          <p>
            Maybe you are in the wrong network? Point Metamask to localhost.<br />
            You contract is not deployed. Follow the instructions below.
          </p>
        </div>
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name={instructionsKey} accounts={this.state.accounts} />
      </div>
    );
  }


  /* Body */ 
  renderBody() {
    return (
      <div className={styles.wrapper}>
        {!this.state.web3 && this.renderLoader()}
        {this.state.web3 && !this.state.contract && (
          this.renderDeployCheck('counter')
        )}
        {this.state.web3 && this.state.contract && (
          <div className={styles.contracts}>
            <h1>Counter Contract is good to Go!</h1>
            <p>Interact with your contract on the right.</p>
            <p> You can see your account onfo on the left </p>
            <div className={styles.widgets}>
              <Web3Info {...this.state} />
              <CounterUI
                decrease={this.decreaseCount}
                increase={this.increaseCount}
                {...this.state} />
            </div>
            {this.state.balance < 0.1 && (
              <Instructions
                ganacheAccounts={this.state.ganacheAccounts}
                name="metamask" accounts={this.state.accounts} />
            )}
            {this.state.balance >= 0.1 && (
              <Instructions
                ganacheAccounts={this.state.ganacheAccounts}
                name="upgrade" accounts={this.state.accounts} />
            )}
          </div>
        )}
      </div>
    );
  }


  /* component of body (above) */  
  renderInstructions() {
    return (
      <div className={styles.wrapper}>
        <Hero />
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name="setup" accounts={this.state.accounts} />
      </div>
    );
  }

  renderFAQ() {
    return (
      <div className={styles.wrapper}>
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name="faq" accounts={this.state.accounts} />
      </div>
    );
  }

  renderEVM() {
    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.wallet && (
        this.renderDeployCheck('evm')
      )}
      {this.state.web3 && this.state.wallet && (
        <div className={styles.contracts}>
          <h1>Wallet Contract is good to Go!</h1>
          <p>Interact with your contract on the right.</p>
          <p> You can see your account onfo on the left </p>
          <div className={styles.widgets}>
            <Web3Info {...this.state} />
            <Wallet
              renounce={this.renounceOwnership} // assign renounceOwnership to renounce
              {...this.state} />
          </div>
          <Instructions
            ganacheAccounts={this.state.ganacheAccounts}
            name="evm" accounts={this.state.accounts} />
        </div>
      )}
      </div>
    );
  }

  renderContactNotebook() {
    return (
      <div className={styles.wrapper}>
        {!this.state.web3 && this.renderLoader()}
        {this.state.web3 && !this.state.contract && (
          this.renderDeployCheck('contact_notebook')
        )}
        {this.state.web3 && this.state.contract && (
          <div className={styles.contracts}>
            <h1>ContactNotebook</h1>
            <div className={styles.widgets}>
              { /* <Web3Info {...this.state} /> */ }
              <ContactNotebook
                create_new_contact={this.createContact}
                get_contact={this.getContact}
                contactsIndex={this.getNumOfContact}      // assign getNumOfContact to contactIndex
                //remove_contact={this.removeContact}
                {...this.state} />
            </div>

            <div className={styles.widgets} style={{textAlign: 'right'}}>
              {this.state.getIndividualContact_name} <br />
              {this.state.getIndividualContact_contactAddress}
            </div>

            <div className={styles.widgets}>
              <form create_new_contact={this.createContact}>
                <p>name<input type="text" onChange={this.onNameChange.bind(this)} /></p>
                <p>contactAddress<input type="text" onChange={this.onContactAddressChange.bind(this)} /></p>
                {/* <button name="submit" onClick={this.onSubmit.bind(this)}>Submit</button> */}
                <button name="submit" onClick={() => this.props.create_new_contact("鈴木", "0xBa7fA8fd86Ce0154eF61927681C2AE5ee246A9A2")}>Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }


  /* router of header of body */ 
  render() {
    return (
      <div className={styles.App}>
        <Header />
          {this.state.route === '' && this.renderInstructions()}
          {this.state.route === 'counter' && this.renderBody()}
          {this.state.route === 'evm' && this.renderEVM()}
          {this.state.route === 'faq' && this.renderFAQ()}
          {this.state.route === 'contact_notebook' && this.renderContactNotebook()}
        <Footer />
      </div>
    );
  }
}

export default App;
