import * as React from 'react';
import styles from './Pillage.module.scss';
import { IPillageProps } from './IPillageProps';
import * as Helpers from '../helpers/helpers';
import { IKing } from '../models/IKing';
import { IUnit } from '../models/IUnit';
import image from './image';
import { ReactBingmaps } from 'react-bingmaps';
import { clone } from '@microsoft/sp-lodash-subset';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

interface IPillageState {
  initialPosition?: any;
  units?: IUnit[];
  isLoading: boolean;
  king: IKing;
  pendingLocation?: any;
}
export default class Pillage extends React.Component<IPillageProps, IPillageState> {

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
    window.location.reload();
  }

  public raidButtonClicked() {
    var x = document.getElementById("main");
    x.innerHTML = "<h1>THIS IS WERE YOU GO TO RAID AND PILLAGE</h1>";
  }

  public trainButtonClicked() {
    var x = document.getElementById("main");
    x.innerHTML = "<h1>UNIT TRAINING CAMP</h1>";
  }

  public merchTripButtonClicked() {
    var x = document.getElementById("main");
    x.innerHTML = "<h1>THIS IS WERE YOU SEND MERCHANTS ON TRIPS</h1>";
  }

  public hireMercButtonClicked() {
    var x = document.getElementById("main");
    x.innerHTML = "<h1>THIS IS WERE YOU HIRE MERCENARIES</h1>";
  }

  public upgradeButtonClicked() {
    var x = document.getElementById("main");
    x.innerHTML = "<h1>THIS IS WERE YOU UPGRADE STUFFS</h1>";
  }

  public AddPushPinOnClick = (location) => {
    console.log(location);
    this.setState({ pendingLocation: location });

  }

  public UpdateLocation(location) {
    let king = clone(this.state.king)
    king.lat = location.latitude
    king.lon = location.longitude
    this.setState({ king, pendingLocation: null });
  }
  public renderConfirmMoveModal() {
    return (
      <div className={styles.modalInner}>
        <div>
          Do you want to move to {Math.round(this.state.pendingLocation.latitude)},
        {Math.round(this.state.pendingLocation.longitude)}?
        </div>
        <div>
          <PrimaryButton className={styles.confirmButton} text='Move!' onClick={() => this.UpdateLocation(this.state.pendingLocation)} />
          <DefaultButton text='Cancel' onClick={() => { this.setState({ pendingLocation: null }); }} />
        </div>
      </div>
    );
  }

  public render(): React.ReactElement<IPillageProps> {
    if (this.state.king) {

      console.log(this.state.king.lat)
    }

    let units = this.state.units
    let level = 1;
    let xp = 1;
    if (units) {
      if (units.length > 0) {
        units.map(unit => {
          xp += unit.level * unit.xp;
          level += unit.level;
        });
      }
    }
    return (
      <div className={styles.pillage}>
        {this.state.pendingLocation &&
          <Modal
            isOpen
          >
            {this.renderConfirmMoveModal()}
          </Modal>
        }
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
                      <p>{level}</p>
                    </div>
                  </div>

                  <div className={styles.headerRight}>
                    <div className={styles.exp}>
                      <h3>{xp} EXP</h3>
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
              {!this.state.isLoading &&
                <>
                  <ReactBingmaps
                    bingmapKey="AqOjCBblrqG96QxoyrEnl2iSw6Y7_cI1QbUbrggrYkuq_LUsxTly5iUOQvXKzdGr"
                    center={[this.state.initialPosition.lat, this.state.initialPosition.lon]}
                    mapTypeId={"grayscale"}
                    navigationBarMode="minified"
                    disableStreetside={true}
                    zoom={4}
                    pushPins={
                      [
                        {
                          "location": [this.state.king.lat, this.state.king.lon],
                          "option": { color: '#1ab18891' },
                          "addHandler": { "type": "click", callback: this.homeButtonClicked }
                        },

                      ]
                    }
                    getLocation={
                      { addHandler: "click", callback: this.AddPushPinOnClick }
                    }
                  >

                  </ReactBingmaps>
                </>
              }
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
      "email": userEmail,
      "FirstName": userEmail.split("@")[0],
      "LastName": (userEmail.split("@")[0] + "sson"),
      "Buff": 1,
      "Penning": 1000,
      "lat": "0",
      "lon": "0",
      "XPGain": 1
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
      this.setState({ king, units, isLoading: false, initialPosition: { lat: king.lat, lon: king.lon } });
    }
    else {
      await this.createKing(this.props.useremail);
      let king: IKing =
      {
        email: this.props.useremail,
        firstName: this.props.useremail.split("@")[0],
        lastName: (this.props.useremail.split("@")[0] + "sson"),
        penning: 1000,
        lat: "0",
        lon: "0",
        XPGain: 1
      }
      const units = await this.fetchUnits(this.props.useremail);
      this.setState({ king, units, isLoading: false });
    }
  }
}