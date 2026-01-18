import { riderDashboardMock } from "../mocks/riderDashboard.mock";

function RiderDashboard() {
  const data = riderDashboardMock;

  return (
    <div className="dashboard">
      {/* HEADER */}
      <header className="header">
        <h2>Unimap+</h2>
        <div>
          <p>{data.rider.name}</p>
          <small>{data.rider.isAvailable ? "Available" : "Unavailable"}</small>
        </div>
      </header>

      {/* AVAILABILITY */}
      <section className="availability">
        <h4>Availability Status</h4>
        <p>
          You're {data.rider.isAvailable ? "available" : "unavailable"} to
          receive delivery requests
        </p>
      </section>

      {/* ACTIVE DELIVERY */}
      <section className="delivery">
        <h4>Active Delivery</h4>

        <p>
          <strong>Pickup location:</strong> {data.activeDelivery.pickupLocation}
        </p>

        <p>
          <strong>Dropoff location:</strong>{" "}
          {data.activeDelivery.dropoffLocation}
        </p>

        <p>
          <strong>Status:</strong> {data.activeDelivery.status}
        </p>

        {/* DELIVERY STEPS */}
        <div className="steps">
          <span className="active">Order accepted</span>
          <span className="active">Picked up</span>
          <span className="active">On the way</span>
          <span>Delivered</span>
        </div>

        <p>Estimated delivery time: {data.activeDelivery.etaMinutes} mins</p>
        <p>Distance remaining: {data.activeDelivery.distanceKm}km</p>

        <button>View Delivery details</button>
      </section>

      {/* STATS */}
      <section className="stats">
        <div>
          <p>Deliveries completed</p>
          <strong>{data.stats.deliveriesCompleted}</strong>
        </div>

        <div>
          <p>Earnings today</p>
          <strong>{data.stats.earningsToday}</strong>
        </div>
      </section>

      {/* CTA */}
      <button className="primary">View Delivery Requests</button>
    </div>
  );
}

export default RiderDashboard;
