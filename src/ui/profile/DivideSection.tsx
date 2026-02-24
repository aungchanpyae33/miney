import TabRoot from "./TabRoot";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserProfile } from "@/database/data";
import ProfileView from "./ProfileView";
import ProfileForm from "./ProfileForm";
import { userFetch } from "@/lib/userFetch";
import { returnUserId } from "@/lib/returnUserId";
import ProfileRightSection from "./ProfileRightSection";
export default async function DivideSection() {
  const user = await userFetch();
  const user_id = returnUserId(user);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user-profile", user_id],
    queryFn: getUserProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TabRoot
        editChild={<ProfileForm key={"edit"} />}
        viewChild={<ProfileView key={"view"} />}
        rightSection={<ProfileRightSection />}
      />
    </HydrationBoundary>
  );
}
