import { FlatList, type FlatListProps, StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type Item = {
  id: string;
  name: string;
  age: number;
  score: number;
};

export type ThemedFlatListProps = FlatListProps<Item> & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

const testData = [
  { id: "1", name: "山田太郎", age: 30, score: 90 },
  { id: "2", name: "田中花子", age: 25, score: 85 },
];

export function ThemedFlatList({
  style,
  lightColor,
  darkColor,
  type = "default",
  data = testData,
  ...rest
}: ThemedFlatListProps) {
  // 選択中のテーマに応じて適切な色を取得する
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.cell}>名前</ThemedText>
        <ThemedText style={styles.cell}>年齢</ThemedText>
        <ThemedText style={styles.cell}>スコア</ThemedText>
      </ThemedView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.row}>
            <ThemedText style={styles.cell}>{item.name}</ThemedText>
            <ThemedText style={styles.cell}>{item.age}</ThemedText>
            <ThemedText style={styles.cell}>{item.score}</ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  container: { flex: 1, padding: 16 },
  header: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#ccc" },
  row: { flexDirection: "row", paddingVertical: 8 },
  cell: { flex: 1, textAlign: "center" },
});
