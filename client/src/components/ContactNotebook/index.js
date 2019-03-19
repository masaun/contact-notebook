import React, { Component } from "react";
import { PublicAddress, Button } from 'rimble-ui';
import styles from './ContactNotebook.module.scss';


export default class ContactNotebook extends Component {

  render() {
  	const { NumContact, numberOfContact } = this.props;  // assign this.props

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
