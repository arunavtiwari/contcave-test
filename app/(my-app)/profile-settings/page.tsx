import ClientOnly from "@/components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import ProfileSettingsClient from "./ProfileSettingsClient";
export const dynamic = "force-dynamic"
import Container from '@/components/Container';

type Props = {};

const ProfileSettings = async (props: Props) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }
  return (
    <Container>
      <ClientOnly>
        <ProfileSettingsClient profile={currentUser} />
      </ClientOnly>
    </Container>
  );
};

export default ProfileSettings;
