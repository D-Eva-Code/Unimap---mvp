import { useState } from "react";
import { riderDashboardMock } from "../mocks/data";
import RiderNav from "../component/RiderNav";

function RiderDashboard() {
  const [riderState, setRiderState] = useState(riderDashboardMock.rider);
  const handleAvailableClick = () => {
    setRiderState((prev) => ({
      ...prev,
      available: !prev.available,
    }));
  };
  const data = riderDashboardMock;
  console.log("RIDER DASHBOARD DATA 👉", data);

  return (
    <>
      <RiderNav rider={riderState} />
      <div className="rider-dashboard">
        {/* AVAILABILITY */}
        <section className="availability">
          <h4>Availability Status</h4>
          <div className="rider-status-box">
            <p className="rider-status">
              You're {riderState.available ? "available" : "unavailable"} to
              receive delivery requests
            </p>
            <button className="toggle" onClick={handleAvailableClick}>
              <i
                className={`fa-solid ${riderState.available ? "fa-toggle-on" : "fa-toggle-off"}`}
              />
            </button>
          </div>
        </section>

        {/* ACTIVE DELIVERY */}
        <section className="delivery">
          <h4>Active Delivery</h4>

          <div className="box-container">
            <div className="box-left">
              <div className="box">
                <label className="pickup">Pickup location:</label>
                <p>{data.activeDelivery.pickup}</p>
              </div>
              <div className="box">
                <label className="pickup">Dropoff location:</label>
                <p>{data.activeDelivery.dropoff}</p>
              </div>
              <div className="box">
                <label className="pickup">Status:</label>
                <p>{data.activeDelivery.status}</p>
              </div>
            </div>
            <button className="view-status">View Delivery details</button>
          </div>

          <div className="steps">
            <div className="active">
              <p>Order accepted</p>
            </div>
            <div className="active">
              <p>Picked up</p>
            </div>
            <div className="active">
              <p>On the way</p>
            </div>
            <div className="delivered">Delivered</div>
          </div>

          <div className="delivery-time-box">
            <div className="box">
              <label className="dt">Estimated delivery time:</label>
              <p>{data.activeDelivery.eta} mins</p>
            </div>
            <div className="box">
              <label className="dt">Distance remaining:</label>
              <p> {data.activeDelivery.distance} km</p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats">
          <div className="completed-d cd">
            <p>Deliveries completed:</p>
            <p>{data.stats.deliveriesCompleted}</p>
          </div>

          <div className="completed-d">
            <p>Earnings today:</p>
            <p>{data.stats.earningsToday}</p>
          </div>
        </section>

        <button className="primary">
          <p className="vd">View Delivery Requests</p>
          <p> See available delivery jobs around campus</p>
        </button>
      </div>
    </>
  );
}

export default RiderDashboard;
