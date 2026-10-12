import { useCallback, useEffect, useState } from "react";
import type { ImageExifData } from "../../types/ImageExifData";
import { TRIPS } from "./trips";

export type ImageData = {
  key: string;
  imageId: string;
  exifData?: ImageExifData;
};

type FolderPageState = {
  images: ImageData[];
  cursor: string | null;
};

export const WORKER =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8787"
    : "https://personal-website-worker.roseak-lin.workers.dev";

const convertExifData = (exifDataString: string | undefined): ImageExifData => {
  if (!exifDataString) {
    return { width: 1, height: 1 };
  }
  try {
    return JSON.parse(exifDataString);
  } catch (err) {
    console.error("Failed to parse EXIF data:", err);
    return { width: 1, height: 1 };
  }
};

const processImages = (rawImages: any[] = []): ImageData[] =>
  rawImages.map((image: any) => ({
    ...image,
    exifData: convertExifData(image.exifData),
  }));

const fetchPage = async (
  prefix: string,
  cursor?: string | null
): Promise<FolderPageState> => {
  const params = new URLSearchParams({ prefix });
  if (cursor) {
    params.set("cursor", cursor);
  }
  const res = await fetch(`${WORKER}/images?${params.toString()}`);
  if (!res.ok) throw new Error("Fetch failed");
  const data = await res.json();
  return {
    images: processImages(data.images),
    cursor: data.cursor ?? null,
  };
};

const cachedFolders = new Map<string, FolderPageState>();
const folderFirstPagePromises = new Map<string, Promise<FolderPageState>>();

const getFirstPage = (prefix: string): Promise<FolderPageState> => {
  const cached = cachedFolders.get(prefix);
  if (cached) return Promise.resolve(cached);

  const existing = folderFirstPagePromises.get(prefix);
  if (existing) return existing;

  const promise = fetchPage(prefix)
    .then((pageState) => {
      cachedFolders.set(prefix, pageState);
      return pageState;
    })
    .catch((err) => {
      folderFirstPagePromises.delete(prefix); // allow a retry
      throw err;
    });

  folderFirstPagePromises.set(prefix, promise);
  return promise;
};

export const useImages = (prefix?: string) => {
  const prefixes = prefix ? [prefix] : TRIPS.map((t) => t.keyPrefix);
  const prefixesKey = prefixes.join("|");

  const getInitialCached = (): FolderPageState | null => {
    if (prefixes.every((p) => cachedFolders.has(p))) {
      return {
        images: prefixes.flatMap((p) => cachedFolders.get(p)!.images),
        cursor: prefix ? (cachedFolders.get(prefix)?.cursor ?? null) : null,
      };
    }
    return null;
  };

  const initialCached = getInitialCached();
  const [images, setImages] = useState<ImageData[]>(initialCached?.images ?? []);
  const [cursor, setCursor] = useState<string | null>(
    initialCached?.cursor ?? null
  );
  const [loading, setLoading] = useState(initialCached === null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    const cached = getInitialCached();
    setLoading(cached === null);
    setError(false);

    Promise.all(prefixes.map((p) => getFirstPage(p)))
      .then((results) => {
        if (!active) return;
        setImages(results.flatMap((r) => r.images));
        setCursor(prefix ? (results[0]?.cursor ?? null) : null);
      })
      .catch((err) => {
        console.error(err);
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [prefixesKey, attempt]);

  const loadMore = useCallback(async () => {
    if (!prefix || !cursor || loadingMore) return;
    try {
      setLoadingMore(true);
      const nextPage = await fetchPage(prefix, cursor);
      const prev = cachedFolders.get(prefix)?.images ?? [];
      const updated: FolderPageState = {
        images: [...prev, ...nextPage.images],
        cursor: nextPage.cursor,
      };
      cachedFolders.set(prefix, updated);
      setImages(updated.images);
      setCursor(updated.cursor);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  }, [prefix, cursor, loadingMore]);

  const retry = useCallback(() => {
    prefixes.forEach((p) => {
      cachedFolders.delete(p);
      folderFirstPagePromises.delete(p);
    });
    setAttempt((a) => a + 1);
  }, [prefixesKey]);

  return { images, cursor, loading, loadingMore, loadMore, error, retry };
};
