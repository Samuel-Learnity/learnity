import {View} from "../Themed";
import Colors from "../../constants/Colors";

export function Spacer({size}: { size: number }) {
    return <View style={{height: size, width: size, backgroundColor: Colors.transparent}}/>;
}
