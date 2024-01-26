import { useState, useEffect, Dispatch, SetStateAction, FC } from "react";
import { StyleSheet, Modal } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { P } from "./typography";
import { Button } from "./ui";
import { ChangeEvent } from "./CreateGroup";

type Props = {
  upcs: string;
  setUpcs: (event: ChangeEvent) => void;
  setScannerOpen: Dispatch<SetStateAction<boolean>>;
};

const Scanner: FC<Props> = ({ setScannerOpen, setUpcs, upcs }) => {
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
      currentTarget: { id: "upcs", value: upcs + `\n` + data },
    });
  };

  if (hasPermission === null) {
    return <P>Requesting for camera permission</P>;
  }
  if (hasPermission === false) {
    return <P>No access to camera</P>;
  }

  return (
    <Modal style={styles.modal}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title={"Tap to Scan Again"}
          style={styles.buttonOne}
          onPress={() => setScanned(false)}
        />
      )}
      <Button
        title="Done Scanning"
        onPress={() => setScannerOpen(false)}
        style={styles.buttonTwo}
      />
    </Modal>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  modal: { position: "relative" },
  buttonOne: { position: "absolute", width: "96%", top: 24 },
  buttonTwo: { position: "absolute", width: "96%", bottom: 24 },
});
