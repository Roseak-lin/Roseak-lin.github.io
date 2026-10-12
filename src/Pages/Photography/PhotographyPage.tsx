import { useMemo } from "react";
import { Button, Container } from "react-bootstrap";
import "./PhotographyPage.css";
import { useTheme } from "../../context/ThemeContext";
import TripCard from "./TripCard/TripCard";
import { TRIPS, tripCover, tripPhotos } from "./trips";
import { useImages } from "./useImages";

const PhotographyPage = () => {
  const { theme } = useTheme();
  const { images, loading, error, retry } = useImages();

  const cards = useMemo(
    () =>
      TRIPS.map((trip) => {
        const photos = tripPhotos(trip, images);
        return {
          trip,
          cover: tripCover(trip, photos),
        };
      }),
    [images]
  );

  return (
    <div className="app photography-page">
      <Container fluid>
        <header className="photography-page__header">
          <span className="photography-page__eyebrow">Photography</span>
          <h1 className="photography-page__title">
            A little collection of my photography :)
          </h1>
          <p className="photography-page__description">
            Pick a trip to see the photos from it.
          </p>
        </header>

        {error ? (
          <div className="photography-page__status" role="alert">
            <p>Couldn't load the photos right now.</p>
            <Button
              variant={`outline-${theme == "dark" ? "light" : "dark"}`}
              onClick={retry}
            >
              Try again
            </Button>
          </div>
        ) : loading ? (
          <div className="trip-grid" aria-busy="true">
            {TRIPS.map((trip) => (
              <div key={trip.id} className="trip-card trip-card--skeleton" />
            ))}
          </div>
        ) : cards.length === 0 ? (
          <p className="photography-page__status">No trips to show yet.</p>
        ) : (
          <div className="trip-grid">
            {cards.map((card) => (
              <TripCard key={card.trip.id} {...card} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default PhotographyPage;