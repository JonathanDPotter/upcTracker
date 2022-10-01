import { FlatList, View } from "react-native";
import React, { Dispatch, FC, SetStateAction } from "react";
import tw from "twrnc";
// interfaces
import { Igroup } from "../../interfaces/group";
// components
import MyText from "../shared/MyText";
import MyButton from "../shared/MyButton";
import Group from "../Group/Group";

interface Iprops {
  groupOpen: Igroup | null;
  setGroupOpen: Dispatch<SetStateAction<Igroup | null>>;
  data: any;
  isLoading: boolean;
}

const HomePresentation: FC<Iprops> = ({
  groupOpen,
  setGroupOpen,
  data,
  isLoading,
}) => {
  return (
    <View style={[tw`flex-1`]}>
      <MyText style={[tw`text-xl mx-auto my-2`]}>Groups</MyText>
      {isLoading && <MyText>Loading...</MyText>}
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <MyButton
              style={tw`mx-auto w-3/4`}
              title={item.title}
              onPress={() => setGroupOpen(item)}
            />
          )}
        />
      )}
      {groupOpen && (
        <Group
          id={groupOpen._id}
          savedTitle={groupOpen.title}
          savedUpcs={groupOpen.upcs}
          close={() => setGroupOpen(null)}
        />
      )}
    </View>
  );
};

export default HomePresentation;
