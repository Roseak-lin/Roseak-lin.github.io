import { useEffect, useState, type ReactNode } from "react";
import "./MasonryGrid.css";

// Keep these breakpoints in sync with any CSS that depends on them
const getColumnCount = () => {
  if (window.matchMedia("(max-width: 480px)").matches) return 1;
  if (window.matchMedia("(max-width: 1068px)").matches) return 2;
  return 4;
};

export const useColumnCount = () => {
  const [count, setCount] = useState(getColumnCount);

  useEffect(() => {
    const onResize = () => setCount(getColumnCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return count;
};

// Deal items out round-robin so the order reads left to right and
// new items only append to the bottom of each column.
const buildColumns = (items: ReactNode[], columnCount: number) => {
  const columns: ReactNode[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => columns[index % columnCount].push(item));

  return columns.map((column, i) => (
    <div className="masonry-column" key={i}>
      {column}
    </div>
  ));
};

type MasonryGridProps = {
  /** Each item needs its own `key` */
  items: ReactNode[];
};

const MasonryGrid = ({ items }: MasonryGridProps) => {
  const columnCount = useColumnCount();
  return <div className="masonry">{buildColumns(items, columnCount)}</div>;
};

// width / height ratios so the skeleton tiles look like a real photo mix
const SKELETON_RATIOS = [1.25, 0.8, 1, 1.5, 0.75, 1.1, 0.9, 1.3];

export const MasonrySkeleton = ({ perColumn = 3 }: { perColumn?: number }) => {
  const columnCount = useColumnCount();
  const items = Array.from({ length: columnCount * perColumn }, (_, i) => (
    <div
      key={i}
      className="masonry-skeleton"
      style={{ aspectRatio: SKELETON_RATIOS[i % SKELETON_RATIOS.length] }}
      aria-hidden="true"
    />
  ));

  return (
    <div className="masonry" aria-busy="true">
      {buildColumns(items, columnCount)}
    </div>
  );
};

export default MasonryGrid;
