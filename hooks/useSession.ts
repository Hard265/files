import store from "@/stores";
import { useObserver } from "mobx-react-lite";

export function useIsAuthenticated() {
    return useObserver(() => store.auth.isAuthenticated);
}

export function useIsUnauthenticated() {
    return !useIsAuthenticated();
}
