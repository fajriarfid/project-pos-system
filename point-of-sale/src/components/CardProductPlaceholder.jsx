const CardProductPlaceholder = () => {
  return (
    <div className="card" style={{ height: "100%" }}>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          className="skeleton"
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            height: "180px",
            width: "100%",
            borderRadius: "var(--radius)",
          }}
        />

        <div>
          <div
            className="skeleton"
            style={{
              height: "1.25rem",
              marginBottom: "0.5rem",
              width: "80%",
              borderRadius: "var(--radius-sm)",
            }}
          />

          <div
            className="skeleton"
            style={{
              height: "1rem",
              marginBottom: "1rem",
              width: "60%",
              borderRadius: "var(--radius-sm)",
            }}
          />

          <div className="d-flex justify-between align-center">
            <div
              className="skeleton"
              style={{
                height: "1.5rem",
                width: "40%",
                borderRadius: "var(--radius-sm)",
              }}
            />

            <div
              className="skeleton"
              style={{
                height: "36px",
                width: "36px",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductPlaceholder;
