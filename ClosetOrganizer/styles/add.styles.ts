import { StyleSheet } from "react-native";

export default StyleSheet.create({
    error: {
        color: "red",
        fontSize: 14,
        marginBottom: 6,
    },

    dropdownWrapper: {
        marginBottom: 18,
    },

    dropdown: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    dropdownText: {
        color: "#555",
        fontSize: 15,
    },

    dropdownMenu: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        marginTop: 6,
        overflow: "hidden",
    },

    dropdownItemWrapper: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    dropdownItem: {
        fontSize: 15,
        color: "#333",
    },


    container: {
        flex: 1,
        backgroundColor: "#F7F8FA",
        paddingTop: 32,
        paddingBottom: 48,
        paddingHorizontal: 32,
    },

    title: {
        fontSize: 36,
        fontWeight: "700",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 18,
        color: "#666",
        marginBottom: 22,
    },

    uploadBox: {
        borderWidth: 2,
        borderColor: "#CBD5E0",
        borderStyle: "dashed",
        borderRadius: 12,
        height: 190,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 28,
        backgroundColor: "#FAFAFA",
    },

    uploadTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 4,
    },

    uploadSubtitle: {
        color: "#777",
        fontSize: 15,
        textAlign: "center",
        marginBottom: 12,
    },

    browseButton: {
        backgroundColor: "#E2E8F0",
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 8,
    },

    browseButtonText: {
        color: "#4A5568",
        fontWeight: "600",
        fontSize: 15,
    },

    form: {
        width: "100%",
        marginTop: 8,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 6,
    },

    input: {
        backgroundColor: "#fff",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        borderRadius: 8,
        padding: 14,
        marginBottom: 16,
        fontSize: 15,
    },
    inputError: {
  borderColor: "red",
},

    notesInput: {
        height: 100,
        textAlignVertical: "top",
    },

    row: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 16,
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 16,
        gap: 12,
    },

    cancelButton: {
        borderWidth: 1,
        borderColor: "#CBD5E0",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },

    cancelText: {
        color: "#555",
        fontWeight: "600",
        fontSize: 15,
    },

    addButton: {
        backgroundColor: "#4B7BFF",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },

    addButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    
   dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
},

dateIconButton: {
    backgroundColor: "#E2E8F0",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
},



});