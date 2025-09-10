import { getGravatarUrl } from "@/utils";
import _ from "lodash";
import React from "react";
import { PixelRatio } from "react-native";
import { Avatar } from "./Avatar";

const getUrlMemoized = _.memoize(getGravatarUrl);

export function UserAvatar({ email }: { email?: string }) {
    const [url, setUrl] = React.useState("");

    const avatarSize = React.useMemo(
        () => PixelRatio.getPixelSizeForLayoutSize(18),
        [],
    );
    React.useEffect(() => {
        async function fetchGravatar() {
            if (!email) return;
            const url = await getUrlMemoized(email);
            setUrl(url);
        }
        fetchGravatar();
    }, [email]);

    return <Avatar source={{ uri: url }} size={avatarSize} />;
}
