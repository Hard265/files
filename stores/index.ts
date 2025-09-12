import { AppStore } from "./app";
import { AuthStore } from "./auth";
import { UIStore } from "./ui";

export * from "./auth";
export * from "./ui";

class Store {
    app: AppStore;
    auth: AuthStore;
    ui: UIStore;

    constructor() {
        this.app = new AppStore();
        this.auth = new AuthStore();
        this.ui = new UIStore();
    }
}

const store = new Store();
export default store;
