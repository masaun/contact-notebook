import React, { Component } from "react";
import { PublicAddress, Button } from 'rimble-ui';
import styles from './ContactNotebook.module.scss';


export default class ContactNotebook extends Component {

  render() {
  	const { NumContact } = this.props;  // assign this.props
    //const { contract, NumContact } = this.props;  // assign this.props
    return (
      // in progress
      <div className={styles.counter}>
        <h3> Your Counter Contract Instance </h3>
        <div className={styles.dataPoint}>
          <div className={styles.label}>
            Instance address:
          </div>
          <div className={styles.value}>
            {/* <PublicAddress address={contract._address} /> */}
            <PublicAddress address={NumContact._address} />
          </div>
        </div>

        <div className={styles.dataPoint}>
          <div className={styles.label}>
            Counter Value:
          </div>
      	  {/*
          <div className={styles.value}>
            {count}
          </div>
          */}
        </div>

        <div className={styles.label}>
          Counter Actions
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
