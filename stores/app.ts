import { makeObservable, observable } from "mobx";

export enum DataUsage {
    WIFI_ONLY = "wifi-only",
    ALL = "all",
}

export class AppStore {
    dataUsage: DataUsage = DataUsage.ALL;

    constructor() {
        makeObservable(this, {
            dataUsage: observable,
        });
    }

    get isWifiOnly() {
        return this.dataUsage === DataUsage.WIFI_ONLY;
    }

    setDataUsage(dataUsage: DataUsage) {
        this.dataUsage = dataUsage;
    }
}
