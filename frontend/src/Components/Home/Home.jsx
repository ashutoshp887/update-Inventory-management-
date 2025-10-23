import React from "react";

const Home = () => {
  const heroImage =
    "https://images.unsplash.com/photo-1581092795364-537530a0a3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${heroImage})`,
          height: "60vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "30px 50px",
            borderRadius: "15px",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "15px" }}>
            Inventory Management System
          </h1>
          <p style={{ fontSize: "1.2rem" }}>
            Manage your products, stock, and orders seamlessly with our intuitive platform.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: "50px 20px", textAlign: "center", backgroundColor: "#f5f5f5" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Why Choose Us?</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "250px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Real-time Stock</h3>
            <p>Keep track of your inventory levels in real-time and avoid stock-outs.</p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "250px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Easy Updates</h3>
            <p>Update product quantities and details quickly through a simple interface.</p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "250px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Reports & Analytics</h3>
            <p>Generate automated reports to understand trends and make informed decisions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
