import type { ImageData } from "./useImages";

export type Trip = {
  /** Used in the URL: /photography/:id */
  id: string;
  title: string;
  location: string;
  dateLabel: string;
  description: string;
  /** Photos whose key starts with this belong to the trip */
  keyPrefix: string;
  /** Exact keys of your favorite photos from this trip */
  favorites: string[];
  /** Optional cover photo key. Defaults to the first favorite, then the first photo */
  coverKey?: string;
};

// Order here is the order on the page (and the previous/next links)
export const TRIPS: Trip[] = [
  {
    id: "tokyo-2024",
    title: "Tokyo",
    location: "Tokyo, Kamakura",
    dateLabel: "November - December 2024",
    description: "First international solo.",
    keyPrefix: "japan-2024/",
    favorites: [""],
  },
  {
    id: "china-2025",
    title: "China",
    location: "Xiamen, Guangzhou",
    dateLabel: "March 2025",
    description: "Replace this with a line or two about the trip.",
    keyPrefix: "china-2025/",
    favorites: [""],
  },
  {
    id: "journey-to-the-east",
    title: "Journey to the East (Grad Trip 2026)",
    location: "Beijing, Shanghai, Suzhou, Osaka, Kyoto, Tokyo, Kamakura",
    dateLabel: "May 2026",
    description: "20 day adventure through the motherland and its neighbor",
    keyPrefix: "journey-to-the-east/",
    favorites: [""],
  },
];

// The one place that decides which photos belong to a trip
export const tripPhotos = (trip: Trip, images: ImageData[]) =>
  images.filter((image) => image.key.startsWith(trip.keyPrefix));

export const tripCover = (trip: Trip, photos: ImageData[]) =>
  photos.find((p) => p.key === trip.coverKey) ??
  photos.find((p) => trip.favorites.includes(p.key)) ??
  photos[0];

export const isLandscape = (image: ImageData) => {
  const { width, height } = image.exifData ?? { width: 1, height: 1 };
  return width >= height;
};

