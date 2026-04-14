import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AppText, Spacer, Row, Column } from "@components/index";

// Dummy data for incoming messages / requests
const INITIAL_MESSAGES = [
  {
    id: "msg1",
    type: "NEW_REQUEST",
    title: "New Request: TU - Transcript",
    message: "Ram Bahadur has requested an EXPRESS service for Tribhuvan University.",
    time: "10 min ago",
    userName: "Ram Bahadur",
    avatar: "https://i.pravatar.cc/150?img=12",
    read: false,
  },
  {
    id: "msg2",
    type: "DOC_UPLOAD",
    title: "Documents Uploaded",
    message: "Aayush has uploaded the required Citizenship and previous grade sheets.",
    time: "1 hour ago",
    userName: "Aayush Shrestha",
    avatar: "https://i.pravatar.cc/150?img=14",
    read: true,
  },
  {
    id: "msg3",
    type: "PAYMENT",
    title: "Payment Verified",
    message: "Payment of Rs. 1500 has been verified for PU - Official Transcript.",
    time: "Yesterday",
    userName: "Hari Sharma",
    avatar: "https://i.pravatar.cc/150?img=33",
    read: true,
  },
  {
    id: "msg4",
    type: "SUPPORT",
    title: "Message from Kiran",
    message: "Hello sir, how long will the transcript take to arrive?",
    time: "Yesterday",
    userName: "Kiran Rai",
    avatar: "https://i.pravatar.cc/150?img=68",
    read: true,
  },
];

export default function DartaSathiInboxScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const getIconForType = (type: string) => {
    switch (type) {
      case "NEW_REQUEST":
        return { name: "document-text", color: "#D15000", bg: "#FFF3E0" };
      case "DOC_UPLOAD":
        return { name: "cloud-upload", color: "#2E7D32", bg: "#E8F5E9" };
      case "PAYMENT":
        return { name: "cash", color: "#3949AB", bg: "#E8EAF6" };
      case "SUPPORT":
        return { name: "chatbubble-ellipses", color: "#00838F", bg: "#E0F7FA" };
      default:
        return { name: "notifications", color: "#757575", bg: "#F5F5F5" };
    }
  };

  const markAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const renderItem = ({ item }: { item: typeof INITIAL_MESSAGES[0] }) => {
    const iconData = getIconForType(item.type);

    return (
      <TouchableOpacity
        style={[styles.messageCard, !item.read && styles.unreadCard]}
        onPress={() => markAsRead(item.id)}
        activeOpacity={0.7}
      >
        <Row align="flex-start" gap={12}>
          {/* Left Icon or Avatar */}
          <View>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={[styles.typeIconBadge, { backgroundColor: iconData.bg }]}>
              <Ionicons name={iconData.name as any} size={10} color={iconData.color} />
            </View>
          </View>

          {/* Right Content */}
          <Column flex={1}>
            <Row justify="space-between" align="center">
              <AppText
                variant="caption"
                weight={item.read ? "bold" : "800"}
                color={item.read ? "#333333" : "#000000"}
                numberOfLines={1}
                style={{ flex: 1, marginRight: 8 }}
              >
                {item.title}
              </AppText>
              <AppText variant="micro" color={item.read ? "#757575" : "#D15000"} weight={item.read ? "medium" : "bold"}>
                {item.time}
              </AppText>
            </Row>

            <Spacer size="xs" />
            
            <AppText
              variant="micro"
              color={item.read ? "#555555" : "#333333"}
              numberOfLines={2}
              style={{ lineHeight: 18 }}
              weight={item.read ? "regular" : "medium"}
            >
              {item.message}
            </AppText>

            <Spacer size="sm" />
            
            <Row align="center" gap={4}>
              <Ionicons name="person-outline" size={12} color="#888" />
              <AppText variant="micro" color="#888">
                {item.userName}
              </AppText>
            </Row>
          </Column>

          {/* Unread dot indicator */}
          {!item.read && <View style={styles.unreadDot} />}
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <AppText variant="h2" weight="bold" color="#000000">
          Inbox & Requests
        </AppText>
        <TouchableOpacity>
          <Ionicons name="checkmark-done" size={24} color="#D15000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  messageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  unreadCard: {
    backgroundColor: "#FFF8F5", // very subtle orange tint
    borderColor: "#FCE4D6",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E2E8F0",
  },
  typeIconBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  separator: {
    height: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D15000",
    marginTop: 6,
  },
});
