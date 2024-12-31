import React from "react";
import { ListRenderItem, Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedInputText } from "@/components/ThemedInputText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedFlatList } from "@/components/ThemedFlatList";

import { Todo, useTodoService } from "@/store/todoService";

export default function HomeScreen() {
  const { fetchTodos, createTodo, updateTodo, deleteTodo } = useTodoService();
  const [text, setText] = React.useState("");
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const getTodos = async () => {
    setTodos(await fetchTodos());
  };

  // 初期描画時にTodoリストを取得
  React.useEffect(() => {
    getTodos();
  }, []); //　空の配列を第2引数に渡すことで初回のみ実行される

  const renderTodos: ListRenderItem<Todo> = ({ item }) => (
    <ThemedView key={item.id} style={styles.row}>
      <ThemedText style={styles.cell}>{item.title}</ThemedText>
      <ThemedText style={styles.cell}>{item.done ? "Done" : "In progress"}</ThemedText>
    </ThemedView>
  );

  const headerComponent = (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.cell}>タイトル</ThemedText>
      <ThemedText style={styles.cell}>ステータス</ThemedText>
    </ThemedView>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">よろ!</ThemedText>
        <HelloWave />
      </ThemedView>
      {/* ParallaxScrollViewのスクロールと衝突するので、後でThemedFlatListを代わりに親タグとして使用する */}
      <ThemedFlatList data={todos} renderItem={renderTodos} ListHeaderComponent={headerComponent} />
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>{text}</ThemedText>
        <ThemedInputText text={text} onChangeText={(text) => setText(text)} />
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  header: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#ccc" },
  row: { flexDirection: "row", paddingVertical: 8 },
  cell: { flex: 1, textAlign: "center" },
});
