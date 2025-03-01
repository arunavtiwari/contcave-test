
import getAddons from '@/app/actions/getAddons';
import getAmenities from '@/app/actions/getAmenities';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import PropertyClient from '@/components/PropertyClient';
export const dynamic = "force-dynamic"
import React from 'react';
import Container from '@/components/Container';

interface IParams {
  propertyId?: string;
}
const EditPropertyComponent = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById({ listingId: params.propertyId }) as any;
  const amenitiesData = await getAmenities(true);
  let addonsData = await getAddons();
  let updatedAddons: any = [];
  if (listing && listing.addons && listing.addons.length) {
    updatedAddons = addonsData.map((item) => {
      let addon = listing.addons?.find((listitem: any) => listitem.name === item.name);
      if (addon) {
        return {
          ...item,
          price: addon.price,
          qty: addon.qty,
          checked: addon.checked ?? true
        };
      } else {
        return item;
      }
    });

    listing.addons?.forEach((addon: any) => {
      let exists = addonsData.some((item) => item.name === addon.name);
      if (!exists) {
        updatedAddons.push({
          ...addon,
          checked: addon.checked ?? true
        });
      }
    });

  }
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
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
        <PropertyClient listing={listing} predefinedAmenities={amenitiesData} predefinedAddons={updatedAddons}></PropertyClient>
      </ClientOnly>
    </Container>
  );
};

export default EditPropertyComponent;
