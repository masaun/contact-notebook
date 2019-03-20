import React, { Component } from "react";
import { PublicAddress, Button } from 'rimble-ui';
import styles from './ContactNotebook.module.scss';


export default class ContactNotebook extends Component {

  render() {
  	const { NumContact, numberOfContact, createNewContact, createNewContact_transactionHash, getIndividualContact, getIndividualContact_name, getIndividualContact_contactAddress, name, contactAddress } = this.props;  // assign this.props

    return (
      <div className={styles.counter}>
        <h3> Your ContactNotebook Contract Instance </h3>
        <div className={styles.dataPoint}>
          <div className={styles.label}>
            Instance address:
          </div>
          <div className={styles.value}>
            <PublicAddress address={NumContact._address} />
          </div>
        </div>

        <div className={styles.dataPoint}>
          <div className={styles.label}>
            Create New Contact:
          </div>
          <div className={styles.value}>
            { /* {createNewContact} */}
            {createNewContact_transactionHash}
          </div>
        </div>
        <div className={styles.buttons}>
          <p>name<input type="text" value={this.state.name} onChange={this.onNameChange} /></p>
          <p>contactAddress<input type="text" value={this.state.contactAddress} onChange={this.onContactAddressChange} /></p>

          <Button
            onClick={() => this.props.create_new_contact("鈴木太郎", "0xBa7fA8fd86Ce0154eF61927681C2AE5ee246A9A2")}
            size="small">Create New Contact</Button>
        </div>

        <div className={styles.dataPoint}>
          <div className={styles.label}>
            Get Individual Contact:
          </div>
          <div className={styles.value}>
            { /* {getIndividualContact} */}
            {getIndividualContact_name}
            {getIndividualContact_contactAddress}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            onClick={() => this.props.get_individual_contact(0)}
            size="small">Get Individual Contact</Button>
        </div>

        <div className={styles.dataPoint}>
          <div className={styles.label}>
            Get Number of contacts:
          </div>
          <div className={styles.value}>
            {numberOfContact}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            onClick={() => this.props.contactIndex()}
            size="small">Get Index of Contact</Button>
        </div>
      </div>
    );
  }
}
