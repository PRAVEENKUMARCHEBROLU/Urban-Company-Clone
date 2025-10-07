import "../styles/home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>Book Trusted Professionals On-Demand</h1>
          <p>Your home, your time — we bring expert services to your doorstep.</p>
          <button className="cta-btn">Get Started</button>
        </div>
      </section>

      {/* About Section */}
      <section className="home-about">
        <h2>Why Urban Company?</h2>
        <p>
          We connect you with verified professionals for home maintenance,
          beauty, fitness, and more. Trusted by millions for reliability,
          affordability, and convenience.
        </p>
      </section>

      {/* Services Section */}
      <section className="home-services">
        <h2>Popular Services</h2>
        <div className="services-grid">
          <div className="service-card">
            {/* <img src="https://images.unsplash.com/photo-1581091012184-7e0cdfbb6791" alt="Home Cleaning" /> */}
            <h3>Home Cleaning</h3>
            <p>Professional deep cleaning for a sparkling home.</p>
          </div>
          <div className="service-card">
            {/* <img src="https://images.unsplash.com/photo-1601044816294-5ce0f97f88b0" alt="AC Repair" /> */}
            <h3>AC Repair</h3>
            <p>Fast, reliable repair and maintenance of your cooling systems.</p>
          </div>
          <div className="service-card">
            {/* <img src="https://images.unsplash.com/photo-1598496382143-072a2f5d61df" alt="Fitness Coach" /> */}
            <h3>Fitness Coach</h3>
            <p>Personalized training plans to meet your fitness goals.</p>
          </div>
          <div className="service-card">
            {/* <img src="https://images.unsplash.com/photo-1598496382143-072a2f5d61df" alt="Fitness Coach" /> */}
            <h3>TV Mechanic</h3>
            <p>Professional TV Mechanic for Sonovision .</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-item">✔ Verified Experts</div>
          <div className="feature-item">✔ Transparent Pricing</div>
          <div className="feature-item">✔ Quick & Easy Booking</div>
          <div className="feature-item">✔ 24/7 Customer Support</div>
        </div>
      </section>
    </div>
  );
}

export default Home;


