import getUser from "./actions";
import EditProfile from "@/components/edit-profile";

export default async function Page({ params }: { params: { id: string } }) {
  const userData = await getUser();
  const resolvedParams = await params;
  return <EditProfile params={resolvedParams} userData={userData} />;
}
