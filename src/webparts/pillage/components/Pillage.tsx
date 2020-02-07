import * as React from 'react';
import styles from './Pillage.module.scss';
import { IPillageProps } from './IPillageProps';
import * as Helpers from '../helpers/helpers';
import { IKing } from '../models/IKing';
import { IUnit } from '../models/IUnit';
import image from './image';





export default class Pillage extends React.Component<IPillageProps, { units?: IUnit[], isLoading: boolean; king: IKing }> {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      king: null
    };
  }

  public async componentDidMount() {
    await this.fetchData();

  }

  public homeButtonClicked() {
    var x = document.getElementById("main");
    x.style.background = "#07222b";
    x.innerHTML = "<h1>THIS IS YOUR HOME</h1>";
  }

  public raidButtonClicked() {
    var x = document.getElementById("main");
    x.style.background = "#7c2c2c";
    x.innerHTML = "<h1>THIS IS WERE YOU GO TO RAID AND PILLAGE</h1>";
  }

  public trainButtonClicked() {
    var x = document.getElementById("main");
    x.style.background = "#3a7c2c";
    x.innerHTML = "<h1>UNIT TRAINING CAMP</h1>";
  }

  public merchTripButtonClicked() {
    var x = document.getElementById("main");
    x.style.background = "#2c7a7c";
    x.innerHTML = "<h1>THIS IS WERE YOU SEND MERCHANTS ON TRIPS</h1>";
  }

  public hireMercButtonClicked() {
    var x = document.getElementById("main");
    x.style.background = "#7c2c53";
    x.innerHTML = "<h1>THIS IS WERE YOU HIRE MERCENARIES</h1>";
  }

  public upgradeButtonClicked() {
    var x = document.getElementById("main");
    x.style.background = "#797c2c";
    x.innerHTML = "<h1>THIS IS WERE YOU UPGRADE STUFFS</h1>";
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
                      <img src={image} />
                    </div>
                    <div className={styles.displayName}>
                      <h1>{this.state.king.firstName} {this.state.king.lastName}</h1>
                    </div>
                    <div className={styles.level}>
                    <p>{this.state.units.length*10}</p>
                    </div>
                  </div>

                  <div className={styles.headerRight}>
                    <div className={styles.exp}>
                    <h3>{this.state.units.length + 43} EXP</h3>
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
              <button onClick={this.homeButtonClicked} className={styles.button}>Home</button>
              <button onClick={this.raidButtonClicked} className={styles.button}>Start raid</button>
              <button onClick={this.trainButtonClicked} className={styles.button}>Train units</button>
              <button onClick={this.merchTripButtonClicked} className={styles.button}>Merch trip</button>
              <button onClick={this.hireMercButtonClicked} className={styles.button}>Hire mercs</button>
              <button onClick={this.upgradeButtonClicked} className={styles.button}>Upgrades</button>
            </div>

            <div className={styles.main} id="main">
              <h1>THIS IS YOUR HOME</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  private async fetchKing(userEmail: string) {
    const res = await fetch(`https://pillagers-storage-functions.azurewebsites.net/api/GetKing?email=${userEmail}`);
    const json = await res.json();
    return Helpers.mapJsonToKing(json);
  }

  private async fetchUnits(userEmail: string) {
    const res = await fetch(`https://pillagers-storage-functions.azurewebsites.net/api/GetUnits?email=${userEmail}`);
    const json = await res.json();
    return Helpers.mapJsonToUnits(json);
  }

  private async createKing(userEmail: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {
      "email":userEmail,
      "FirstName":userEmail.split("@")[0],
      "LastName":(userEmail.split("@")[0]+"sson"),
      "Buff":1,
      "Penning": 1000,
      "lat":"0",
      "lon":"0",
      "XPGain":1
    }
    const res = await fetch(`https://pillagers-storage-functions.azurewebsites.net/api/CreateKing`, {
      headers,
      method: 'post',
      body: JSON.stringify(body)
    });
  }

  private async fetchData() {
    const king = await this.fetchKing(this.props.useremail);
    if (king) {
      const units = await this.fetchUnits(this.props.useremail);
      this.setState({ king, units, isLoading: false });
    }
    else {
      await this.createKing(this.props.useremail);
      let king : IKing  = 
      { email: this.props.useremail,
        firstName: this.props.useremail.split("@")[0],
        lastName: (this.props.useremail.split("@")[0]+"sson"),
        penning: 1000,
        lat: "0",
        lon: "0",
        XPGain:1
      }
      const units = await this.fetchUnits(this.props.useremail);
      this.setState({ king, units, isLoading: false });
    }

  }
  


}