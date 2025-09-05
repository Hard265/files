import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import * as SecureStore from "expo-secure-store";
import { ApolloClient } from "@apollo/client";

interface Token {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
}

export interface User {
    id?: string;
    email: string;
    is_active?: boolean;
}

export class AuthStore {
    private token: Token | null = null;
    user: User | null = null;
    isLoading: boolean = false;

    constructor() {
        makeObservable<this, "token" | "user">(this, {
            token: observable,
            user: observable,
            isLoading: observable,
            isAuthenticated: computed,
            authorizationHeader: computed,
            setup: action,
            signin: action,
            signout: action,
        });
        this.setup();
    }

    async setup() {
        runInAction(() => {
            this.isLoading = true;
        });
        let token: string | null = null;
        let user: string | null = null;
        try {
            token = await SecureStore.getItemAsync("token");
            user = await SecureStore.getItemAsync("user");
        } catch (err) {
            console.error(err);
        } finally {
            runInAction(() => {
                if (token) this.token = JSON.parse(token);
                if (user) this.user = JSON.parse(user);
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

    async signin(token: Token, user: User) {
        try {
            await SecureStore.setItemAsync("token", JSON.stringify(token));
            await SecureStore.setItemAsync("user", JSON.stringify(user));
        } catch (err) {
            console.log("failed to persist token", err);
        } finally {
            runInAction(() => {
                this.token = token;
                this.user = user;
            });
        }
    }

    async signout(client: ApolloClient<any>) {
        try {
            await SecureStore.deleteItemAsync("token");
            await SecureStore.deleteItemAsync("user");
            await client.clearStore();
        } catch (err) {
            console.log("failed to clear token", err);
        } finally {
            runInAction(() => {
                this.token = null;
                this.user = null;
            });
        }
    }
}
