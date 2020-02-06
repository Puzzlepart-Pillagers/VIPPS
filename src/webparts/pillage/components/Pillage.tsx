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

              <div className={styles.image}>
                <img src="/src/webparts/pillage/images/avatar.png" />
              </div>
              <div className={styles.displayName}>
                <h1>DISPLAYNAME</h1>
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