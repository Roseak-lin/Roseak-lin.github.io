import { Link } from "react-router-dom";
import { Calendar3, GeoAlt } from "react-bootstrap-icons";
import { WORKER, type ImageData } from "../useImages";
import type { Trip } from "../trips";

import "./TripCard.css";

type TripCardProps = {
  trip: Trip;
  cover?: ImageData;
};

const TripCard = ({ trip, cover }: TripCardProps) => (
  <Link to={`/photography/${trip.id}`} className="trip-card">
    {cover && (
      <img
        className="trip-card__image"
        src={`${WORKER}/images/${cover.imageId}`}
        alt={trip.title}
        loading="lazy"
      />
    )}
    <div className="trip-card__overlay" />
    <div className="trip-card__header">
      <h2 className="trip-card__title">{trip.title}</h2>
    </div>
    <div className="trip-card__body">
      <div className="trip-card__details">
        <span className="trip-card__location">
          <GeoAlt /> {trip.location}
        </span>
        <span className="trip-card__date">
          <Calendar3 /> {trip.dateLabel}
        </span>
      </div>
    </div>
  </Link>
);

export default TripCard;
