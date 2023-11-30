import {View} from "../Themed";

export function Spacer({size}: { size: number }) {
    return <View style={{height: size, width: size}}/>;
}
