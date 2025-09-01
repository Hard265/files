import { AuthStore } from "./auth";
import { UIStore } from "./ui";

export * from "./auth";
export * from "./ui";

class Store {
    auth: AuthStore;
    ui: UIStore;

    constructor() {
        this.auth = new AuthStore();
        this.ui = new UIStore();
    }
}

const store = new Store();
export default store;
