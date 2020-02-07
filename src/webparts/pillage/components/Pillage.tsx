import * as React from 'react';
import styles from './Pillage.module.scss';
import { IPillageProps } from './IPillageProps';
import * as Helpers from '../helpers/helpers';
import { IKing } from '../models/IKing';
import { IUnit } from '../models/IUnit';

const { useEffect, useState } = React;

const fetchKing = async (userEmail: string) => {
    const res = await fetch(`https://pillagers-storage-functions.azurewebsites.net/api/GetKing?email=${userEmail}`);
    const json = await res.json();
    return Helpers.mapJsonToKing(json);
  };

  const fetchUnits = async (userEmail: string) => {
    const res = await fetch(`https://pillagers-storage-functions.azurewebsites.net/api/GetUnits?email=${userEmail}`);
    const json = await res.json();
    return Helpers.mapJsonToUnits(json);
  };



export default class Pillage extends React.Component<IPillageProps, {}> {

  public render(): React.ReactElement<IPillageProps> {
    let userEmail = this.props.useremail;
    let king = fetchKing(userEmail);
    console.log(king);;
    return (
      <div className={styles.pillage}>
        <div className={styles.container}>
          <div className={styles.parent}>
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <div className={styles.image}>
                  <img src="/src/webparts/pillage/images/avatar.png" />
                </div>
                <div className={styles.displayName}>
                  <h1>Odin</h1>
                </div>
                <div className={styles.level}>
                  <p>99</p>
                </div>
              </div>

              <div className={styles.headerRight}>
                <div className={styles.exp}>
                  <h3>1337 EXP</h3>
                </div>
                <div className={styles.units}>
                  <h3>420 UNITS</h3>
                </div>
                <div className={styles.currency}>
                  <h3>69 PENNING</h3>
                </div>
              </div>
            </div>
            <div className={styles.nav}>
              <button className={styles.button}>Start raid</button>
              <button className={styles.button}>Train units</button>
              <button className={styles.button}>Merch trip</button>
              <button className={styles.button}>Hire mercs</button>
              <button className={styles.button}>Upgrades</button>
            </div>
            <div className={styles.main}><h1>MAIN CONTENT GOES HERE</h1></div>
          </div>
        </div>
      </div>
    );
  }
}