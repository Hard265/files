import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import * as SecureStore from "expo-secure-store";

interface Token {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
}

export class AuthStore {
    private token: Token | null = null;
    isLoading: boolean = false;

    constructor() {
        makeObservable<this, "token">(this, {
            token: observable,
            isLoading: observable,
            isAuthenticated: computed,
            authorizationHeader: computed,
            setup: action,
            signin: action,
        });
        this.setup();
    }

    async setup() {
        runInAction(() => {
            this.isLoading = true;
        });
        let token: string | null = null;
        try {
            token = await SecureStore.getItemAsync("token");
        } catch (err) {
            console.error(err);
        } finally {
            runInAction(() => {
                if (token) this.token = JSON.parse(token);
                this.isLoading = false;
            });
        }
    }

    get isAuthenticated() {
        return Boolean(this.token?.accessToken);
    }

    get authorizationHeader() {
        if (this.isAuthenticated)
            return { Authorization: `Bearer ${this.token?.accessToken}` };
        return {};
    }

    async signin(token: Token) {
        try {
            await SecureStore.setItemAsync("token", JSON.stringify(token));
        } catch {
            console.log("failed to persist token");
        } finally {
            runInAction(() => (this.token = token));
        }
    }
}
