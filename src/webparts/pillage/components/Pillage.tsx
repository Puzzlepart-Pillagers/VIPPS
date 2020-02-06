import * as React from 'react';
import styles from './Pillage.module.scss';
import { IPillageProps } from './IPillageProps';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

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

              <div className={styles.button}>
                <PrimaryButton text="Start raid" allowDisabledFocus />
              </div>
              <div className={styles.button}>
                <PrimaryButton text="Train units" allowDisabledFocus />
              </div>
              <div className={styles.button}>
                <PrimaryButton text="Merch trip" allowDisabledFocus />
              </div>
              <div className={styles.button}>
                <PrimaryButton text="Upgrades" allowDisabledFocus />
              </div>
              <div className={styles.button}>
                <PrimaryButton text="Hire mercs" allowDisabledFocus />
              </div>
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