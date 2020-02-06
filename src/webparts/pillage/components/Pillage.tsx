import * as React from 'react';
import styles from './Pillage.module.scss';
import { IPillageProps } from './IPillageProps';

export default class Pillage extends React.Component<IPillageProps, {}> {
  public render(): React.ReactElement<IPillageProps> {
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
                  <h1>DISPLAYNAME</h1>
                </div>
                <div className={styles.level}>
                  <h1>99</h1>
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
            <div className={styles.main}><h1>DIV4</h1></div>
          </div>
        </div>
      </div>
    );
  }
}