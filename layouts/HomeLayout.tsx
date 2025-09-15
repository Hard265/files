import SearchPage from "@/pages/Search";
import { PropsWithChildren } from "react";

export default function HomeLayout({ children }: PropsWithChildren) {
    return (
        <>
            {children}
            <SearchPage />
        </>
    );
}
