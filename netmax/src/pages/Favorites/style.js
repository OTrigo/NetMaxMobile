import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171515",
  },
  list: {
    height: "50%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f0f0f0",
    marginStart: "2%",
  },
  subtitle: {
    fontSize: 15,
    color: "#f0f0f0",
    alignSelf: "center",
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  del: {
    backgroundColor: '#f32020',
    marginEnd: '20%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5
  },
});
