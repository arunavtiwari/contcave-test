"use client";

import React, { useState, useRef, useEffect } from "react";
import useCities from "@/hook/useCities";
import { SafeUser } from "@/types";
import Image from "next/image";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import Modal from "../modals/Modal";

type Props = {
  title: string;
  locationValue: string;
  imageSrc: string[];
  id: string;
  currentUser?: SafeUser | null;
};

function ListingHead({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}: Props) {
  const { getByValue } = useCities();
  const location = getByValue(locationValue);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const selectedImageRef = useRef<HTMLDivElement>(null);

  // Create an array to track each image's loaded state
  const [loaded, setLoaded] = useState<boolean[]>(new Array(imageSrc.length).fill(false));

  useEffect(() => {
    // Reset loading state if imageSrc changes
    setLoaded(new Array(imageSrc.length).fill(false));
  }, [imageSrc]);

  const handleImageLoad = (index: number) => {
    setLoaded((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal && selectedImageRef.current) {
      selectedImageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showModal, selectedImageIndex]);

  // Helper to render an image with a Tailwind skeleton overlay
  const renderImageWithSkeleton = (
    src: string,
    index: number,
    extraClasses: string = ""
  ) => (
    <div className="relative w-full h-full cursor-pointer" onClick={() => handleImageClick(index)}>
      {!loaded[index] && (
        <div className={`absolute inset-0 bg-gray-300 animate-pulse rounded-lg`}></div>
      )}
      <Image
        src={src}
        alt={`image-${index}`}
        fill
        onLoadingComplete={() => handleImageLoad(index)}
        className={`object-cover hover:brightness-[90%] ${extraClasses} ${loaded[index] ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
      />
    </div>
  );

  const modalContent = (
    <div className="grid grid-cols-2 gap-2">
      {imageSrc.map((url, index) => {
        const isFeatured = index % 3 === 0;
        return (
          <div
            key={index}
            ref={index === selectedImageIndex ? selectedImageRef : undefined}
            className={`relative ${isFeatured ? "col-span-2" : ""} h-[300px] cursor-pointer`}
            onClick={() => handleImageClick(index)}
          >
            {!loaded[index] && (
              <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>
            )}
            <Image
              src={url}
              alt={`image-${index}`}
              fill
              onLoadingComplete={() => handleImageLoad(index)}
              className={`object-cover rounded-lg ${loaded[index] ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500`}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Title & Heart Button */}
      <div className="flex gap-2">
        <Heading title={title} subtitle={`India, ${location?.label}`} />
        <div className="pt-10">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="relative h-[455px] cursor-pointer" onClick={() => handleImageClick(0)}>
          {!loaded[0] && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-l-lg"></div>
          )}
          {imageSrc[0] && (
            <Image
              src={imageSrc[0]}
              alt="image-0"
              fill
              onLoadingComplete={() => handleImageLoad(0)}
              className={`object-cover rounded-l-lg hover:brightness-[90%] ${loaded[0] ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500`}
            />
          )}
        </div>

        <div className="grid grid-rows-2 grid-cols-2 gap-2 h-[455px]">
          {imageSrc[1] && renderImageWithSkeleton(imageSrc[1], 1)}
          {imageSrc[2] && renderImageWithSkeleton(imageSrc[2], 2, "rounded-r-lg")}
          {imageSrc[3] && renderImageWithSkeleton(imageSrc[3], 3)}
          {imageSrc[4] && (
            <div className="relative w-full h-full">
              {!loaded[4] && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-r-lg"></div>
              )}
              <Image
                src={imageSrc[4]}
                alt="image-4"
                fill
                onLoadingComplete={() => handleImageLoad(4)}
                className={`object-cover rounded-r-lg hover:brightness-[90%] ${loaded[4] ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-500`}
                onClick={() => handleImageClick(4)}
              />
              <button
                className="absolute bottom-3 right-3 bg-white text-black px-4 py-1.5 rounded-lg shadow-md hover:bg-neutral-200 transition font-medium text-base"
                onClick={() => handleImageClick(0)}
              >
                Show all photos
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for All Photos */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={() => { }}
        title="All Photos"
        body={modalContent}
        actionLabel=""
        selfActionButton={true}
      />
    </>
  );
}

export default ListingHead;
