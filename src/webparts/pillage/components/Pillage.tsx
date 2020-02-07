import * as React from 'react';
import styles from './Pillage.module.scss';
import { IPillageProps } from './IPillageProps';
import * as Helpers from '../helpers/helpers';
import { IKing } from '../models/IKing';
import { IUnit } from '../models/IUnit';






export default class Pillage extends React.Component<IPillageProps, { units?: IUnit[], isLoading: boolean; king: IKing }> {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      king: null
    }
  }

  public async componentDidMount() {
    await this.fetchData();

  }

  public render(): React.ReactElement<IPillageProps> {
    let userEmail = this.props.useremail;

    return (
      <div className={styles.pillage}>
        <div className={styles.container}>
          <div className={styles.parent}>
            <div className={styles.header}>              
              {!this.state.isLoading &&
                <>
                  <div className={styles.headerLeft}>
                    <div className={styles.image}>
                      <img src="/src/webparts/pillage/images/avatar.png" />
                    </div>
                    <div className={styles.displayName}>
                      <h1>{this.state.king.firstName}</h1>
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
                      <h3>{this.state.units.length} UNITS</h3>
                    </div>
                    <div className={styles.currency}>
                      <h3>{this.state.king.penning} PENNING</h3>
                    </div>
                  </div>
                </>
              }
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
  private async fetchKing(userEmail: string) {
    const res = await fetch(`https://pillagers-storage-functions.azurewebsites.net/api/GetKing?email=${userEmail}`);
    const json = await res.json();
    return Helpers.mapJsonToKing(json);
  };

  private async fetchUnits(userEmail: string) {
    const res = await fetch(`https://pillagers-storage-functions.azurewebsites.net/api/GetUnits?email=${userEmail}`);
    const json = await res.json();
    return Helpers.mapJsonToUnits(json);
  };


  private async fetchData() {

    const king = await this.fetchKing(this.props.useremail);
    if (king) {
      const units = await this.fetchUnits(this.props.useremail)
      this.setState({ king, units, isLoading: false });
    }

  }


}