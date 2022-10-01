import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
} from "react";
import { StyleSheet, Modal } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import MyText from "../shared/MyText";
import MyButton from "../shared/MyButton";
import IchangeEvent from "../../interfaces/changeEvent";

interface Iprops {
  upcs: string
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
      currentTarget: { id: "upcs", value: upcs + `\n`+ data + `\n` },
    });
  };

  if (hasPermission === null) {
    return <MyText>Requesting for camera permission</MyText>;
  }
  if (hasPermission === false) {
    return <MyText>No access to camera</MyText>;
  }

  return (
    <Modal>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <MyButton
          title={"Tap to Scan Again"}
          onPress={() => setScanned(false)}
        />
      )}
      <MyButton title="done" onPress={() => setScannerOpen(false)} />
    </Modal>
  );
};

export default Scanner;
