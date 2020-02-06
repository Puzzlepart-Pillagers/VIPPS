import * as React from 'react';
import styles from './Pillage.module.scss';
import { IPillageProps } from './IPillageProps';

export default class Pillage extends React.Component<IPillageProps, {}> {
  public render(): React.ReactElement<IPillageProps> {
    return (
      <div className={styles.pillage}>
        <div className={styles.container}>
          <div className={styles.parent}>
            <div className={styles.div1}>
                <img src="/src/webparts/pillage/images/avatar.png" />
              
            </div>

            <div className={styles.div2}>
              <h1>DISPLAYNAME</h1>
              
            </div>

            <div className={styles.div3}>

              <button className={styles.button}>Start raid</button>
              <button className={styles.button}>Train units</button>
              <button className={styles.button}>Merch trip</button>
              <button className={styles.button}>Hire mercs</button>
              <button className={styles.button}>Upgrades</button>
            </div>
            <div className={styles.div4}><h1>DIV4</h1></div>
            <div className={styles.div5}><h1>DIV5</h1></div>
            <div className={styles.div6}><h1>DIV6</h1></div>
          </div>




          {/* <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}><h1>Welcome to Pillage</h1></span>
            </div>

              <div className={styles.column}>
                <div className={styles.button}>
                  <PrimaryButton text="Start raid" allowDisabledFocus />
                  <span><p>stuff</p></span>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.button}>
                  <PrimaryButton text="Train units" allowDisabledFocus />
                  <span>stuff</span>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.button}>
                  <PrimaryButton text="Merch trip" allowDisabledFocus />
                  <span>stuff</span>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.button}>
                  <PrimaryButton text="Upgrades" allowDisabledFocus />
                  <span>stuff</span>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.button}>
                  <PrimaryButton text="Hire mercs" allowDisabledFocus />
                  <span>stuff</span>
                </div>
              </div>
            
          </div> */}
        </div>
      </div>
    );
  }
}