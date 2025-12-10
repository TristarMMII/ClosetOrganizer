import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 40,  
    backgroundColor: "#ffffffff",
  },

  title: {
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  gridWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start", 
    gap: 20,
    width: "100%",
  },

});
