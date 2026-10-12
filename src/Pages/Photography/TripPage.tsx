import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar3,
  GeoAlt,
  StarFill,
} from "react-bootstrap-icons";
import "./PhotographyPage.css";
import CanvasImage from "./CanvasImage/Image";
import MasonryGrid, {
  MasonrySkeleton,
} from "./MasonryGrid/MasonryGrid";
import Modal from "./Modal/Modal";
import { useTheme } from "../../context/ThemeContext";
import { TRIPS, isLandscape, tripPhotos, type Trip } from "./trips";
import { WORKER, useImages, type ImageData } from "./useImages";

type Filter = "all" | "favorites" | "landscape" | "portrait";

const FILTERS: Filter[] = ["all", "favorites", "landscape", "portrait"];

const FILTER_LABELS: Record<Filter, string> = {
  all: "All",
  favorites: "Favorites",
  landscape: "Landscape",
  portrait: "Portrait",
};

type Lightbox = { items: ImageData[]; index: number };

const TripView = ({ index }: { index: number }) => {
  const { theme } = useTheme();
  const trip = TRIPS[index];
  const { images, cursor, loading, loadingMore, loadMore, error, retry } =
    useImages(trip.keyPrefix);

  const prevTrip = TRIPS[index - 1] as Trip | undefined;
  const nextTrip = TRIPS[index + 1] as Trip | undefined;
  const tone = theme == "dark" ? "light" : "dark";

  const [filter, setFilter] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const photos = useMemo(() => tripPhotos(trip, images), [trip, images]);
  const favoriteKeys = useMemo(
    () => new Set(trip.favorites.filter(Boolean)),
    [trip]
  );
  const favorites = useMemo(
    () => photos.filter((p) => favoriteKeys.has(p.key)),
    [photos, favoriteKeys]
  );

  const hasLandscapeAndPortrait = useMemo(() => {
    const landscapeCount = photos.filter(isLandscape).length;
    return landscapeCount > 0 && landscapeCount < photos.length;
  }, [photos]);

  // Hide chips that wouldn't change anything
  const availableFilters = FILTERS.filter((f) => {
    if (f === "all") return true;
    if (f === "favorites") return favorites.length > 0;
    return hasLandscapeAndPortrait;
  });

  const visible = useMemo(() => {
    return photos.filter((p) => {
      if (filter === "favorites") return favoriteKeys.has(p.key);
      if (filter === "landscape") return isLandscape(p);
      if (filter === "portrait") return !isLandscape(p);
      return true;
    });
  }, [photos, filter, favoriteKeys]);

  const openLightbox = (items: ImageData[], startIndex: number) => {
    setModalLoading(true);
    setLightbox({ items, index: startIndex });
    setShowModal(true);
  };

  const stepLightbox = useCallback(
    (delta: number) => {
      if (!lightbox || lightbox.items.length < 2) return;
      const n = lightbox.items.length;
      setModalLoading(true);
      setLightbox({ ...lightbox, index: (lightbox.index + delta + n) % n });
    },
    [lightbox]
  );

  const selectNextImage = useCallback(() => stepLightbox(1), [stepLightbox]);
  const selectPrevImage = useCallback(() => stepLightbox(-1), [stepLightbox]);

  const selectedImage = lightbox ? lightbox.items[lightbox.index] : null;

  const tiles = visible.map((image, i) => (
    <div className="photo-tile" key={image.imageId}>
      <CanvasImage
        src={`${WORKER}/images/${image.imageId}`}
        alt={image.key}
        onClick={() => openLightbox(visible, i)}
      />
      {favoriteKeys.has(image.key) && (
        <span className="photo-tile__star" title="Favorite">
          <StarFill aria-label="Favorite" />
        </span>
      )}
    </div>
  ));

  return (
    <div className="app photography-page">
      <Container fluid>
        <Link to="/photography" className="trip-back">
          <ArrowLeft /> All trips
        </Link>

        <header className="photography-page__header">
          <span className="photography-page__eyebrow">
            <GeoAlt /> {trip.location}
          </span>
          <h1 className="photography-page__title">{trip.title}</h1>
          <p className="trip-date">
            <Calendar3 /> {trip.dateLabel}
          </p>
          <p className="photography-page__description">{trip.description}</p>
        </header>

        {!loading && !error && filter === "all" && favorites.length > 0 && (
          <section className="highlights" aria-labelledby="highlights-title">
            <h2 id="highlights-title" className="trip-section-title">
              <StarFill /> Favorites
            </h2>
            <div className="highlights__track">
              {favorites.map((image, i) => {
                const { width, height } = image.exifData ?? {
                  width: 1,
                  height: 1,
                };
                return (
                  <button
                    type="button"
                    key={image.imageId}
                    className="highlights__item"
                    style={{ aspectRatio: `${width} / ${height}` }}
                    onClick={() => openLightbox(favorites, i)}
                    aria-label={`Open favorite photo ${i + 1} of ${favorites.length}`}
                  >
                    <img
                      src={`${WORKER}/images/${image.imageId}`}
                      alt={image.key}
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {!loading && !error && photos.length > 0 && availableFilters.length > 1 && (
          <div className="trip-toolbar">
            <div className="trip-filters" role="group" aria-label="Filter photos">
              {availableFilters.map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? tone : `outline-${tone}`}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f === "favorites" && <StarFill className="me-1" />}
                  {FILTER_LABELS[f]}
                </Button>
              ))}
            </div>
          </div>
        )}

        {error ? (
          <div className="photography-page__status" role="alert">
            <p>Couldn't load the photos right now.</p>
            <Button variant={`outline-${tone}`} onClick={retry}>
              Try again
            </Button>
          </div>
        ) : loading ? (
          <MasonrySkeleton />
        ) : photos.length === 0 ? (
          <p className="photography-page__status">
            No photos found for this trip yet. Check <code>keyPrefix</code> in
            trips.ts.
          </p>
        ) : visible.length === 0 ? (
          <p className="photography-page__status">
            No photos match this filter.
          </p>
        ) : (
          <>
            <MasonryGrid items={tiles} />
            <div className="photography-page__actions">
              {cursor && (
                <Button
                  variant={`outline-${tone}`}
                  className="photography-page__load-more"
                  onClick={loadMore}
                  disabled={loadingMore}
                  aria-label="Load more Images"
                >
                  {loadingMore && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                  )}
                  {loadingMore ? "Loading..." : "Load More"}
                </Button>
              )}
              {!cursor && photos.length > 0 && !loading && (
                <p className="photography-page__end">
                  That's everything for now
                </p>
              )}
            </div>
          </>
        )}

        <nav className="trip-pager" aria-label="More trips">
          {prevTrip ? (
            <Link
              to={`/photography/${prevTrip.id}`}
              className="trip-pager__link"
            >
              <ArrowLeft />
              <span>
                <small>Previous trip</small>
                {prevTrip.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {nextTrip ? (
            <Link
              to={`/photography/${nextTrip.id}`}
              className="trip-pager__link trip-pager__link--next"
            >
              <span>
                <small>Next trip</small>
                {nextTrip.title}
              </span>
              <ArrowRight />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </Container>

      <Modal
        show={showModal}
        setShowModal={setShowModal}
        showNextImage={selectNextImage}
        showPrevImage={selectPrevImage}
      >
        <Modal.Box>
          {selectedImage && (
            <>
              {modalLoading && (
                <Spinner animation="border" role="status" className="me-3" />
              )}
              <img
                src={`${WORKER}/images/${selectedImage.imageId}`}
                alt={selectedImage.key}
                onLoad={() => setModalLoading(false)}
                style={{
                  display: modalLoading ? "none" : "block",
                }}
              />
            </>
          )}
          <Modal.Footer
            exifData={selectedImage?.exifData ?? { width: 1, height: 1 }}
          />
        </Modal.Box>
      </Modal>
    </div>
  );
};

const TripPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const index = TRIPS.findIndex((t) => t.id === tripId);

  if (index === -1) {
    return (
      <div className="app photography-page">
        <Container fluid>
          <div className="photography-page__status">
            <p>That trip doesn't exist.</p>
            <Link to="/photography">Back to all trips</Link>
          </div>
        </Container>
      </div>
    );
  }

  // key resets filters and lightbox when moving between trips
  return <TripView key={tripId} index={index} />;
};

export default TripPage;
