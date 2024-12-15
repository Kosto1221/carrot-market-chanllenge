import getUser from "@/app/(tabs)/profile/actions";
import TabBar from "./tab-bar";

export default async function TabBarAdvanced() {
  const user = await getUser();
  return <TabBar avatar={user.avatar} username={user.username} />;
}
