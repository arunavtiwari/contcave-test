import ClientOnly from "@/components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import PaymentDetailsClient from "./PaymentDetailsClient";
import Container from "@/components/Container";
export const dynamic = "force-dynamic"

type Props = {};

const PaymentDetails = async (props: Props) => {
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
        <PaymentDetailsClient profile={currentUser} />
      </ClientOnly>
    </Container>
  );
};

export default PaymentDetails;
