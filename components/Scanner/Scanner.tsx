import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
} from "react";
import { StyleSheet, Modal, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import tw from "twrnc";
// components
import MyText from "../shared/MyText";
import MyButton from "../shared/MyButton";
// interfaces
import IchangeEvent from "../../interfaces/changeEvent";

interface Iprops {
  upcs: string;
  setUpcs: (event: IchangeEvent) => void;
  setScannerOpen: Dispatch<SetStateAction<boolean>>;
}

const Scanner: FC<Iprops> = ({ setScannerOpen, setUpcs, upcs }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setUpcs({
      currentTarget: { id: "upcs", value: upcs + `\n` + data + `\n` },
    });
  };

  if (hasPermission === null) {
    return <MyText>Requesting for camera permission</MyText>;
  }
  if (hasPermission === false) {
    return <MyText>No access to camera</MyText>;
  }

  return (
    <Modal style={tw`relative`}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <MyButton
          title={"Tap to Scan Again"}
          style={tw`absolute top-[1.5rem] w-[96%]`}
          onPress={() => setScanned(false)}
        />
      )}
      <MyButton
        title="Done Scanning"
        onPress={() => setScannerOpen(false)}
        style={tw`absolute bottom-[1.5rem] w-[96%]`}
      />
    </Modal>
  );
};

export default Scanner;
