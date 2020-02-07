
import { IPillageProps } from '../IPillageProps';
import { Guid, RandomNumberGenerator, IRandomNumberGenerator } from '@microsoft/sp-core-library';

export const GetKing = async (userEmail: string) => {
    let res = await fetch(`https://pillagers-storage-functions.azurewebsites.net/api/GetUnits?email=${userEmail}`);
    let json = await res.json();
    return json.value.map(obj => {
        return {
            email: obj.RowKey,
            penning: obj.Penning,
            lat: obj.lat,
            lon: obj.lon
        };
    })[0];
};

export const GetUnits = async (userEmail: string) => {
    let res = await fetch(`https://pillagers-storage-functions.azurewebsites.net/api/GetKing?email=${userEmail}`);
    let json = await res.json();
    return json.value.map(obj => {
        return {
            firstName: obj.FirstName,
            lastName: obj.LastName,
            xp: obj.XP,
            level: obj.Level,
            rank: obj.Rank,
            dead: obj.Dead
        };
    });
};

export const CreateKing = async (userEmail: string) => {
};