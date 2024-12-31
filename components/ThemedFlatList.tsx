import { FlatList, type FlatListProps, StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";

export type ThemedFlatListProps<T> = FlatListProps<T> & {
  data: T[];
  renderItem?: FlatListProps<T>["renderItem"];
};

export function ThemedFlatList<T>({ style, ...rest }: ThemedFlatListProps<T>) {
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={rest.data}
        renderItem={
          rest.renderItem ||
          (({ item }) => (
            // 何も指定されていない場合はデフォルトのレンダリングを行う
            <ThemedView />
          ))
        }
        ListHeaderComponent={rest.ListHeaderComponent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
