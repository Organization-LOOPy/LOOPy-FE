const StampLegend = () => {
  return (
    <div
      style={{
        width: "9.1875rem", // 147px
        height: "3.5rem",   // 56px
        backgroundColor: "#fff",
        borderRadius: "0.5rem",
        padding: "0.5rem 0.75rem",
        boxShadow: "0 0 0.25rem rgba(0,0,0,0.1)",
        fontSize: "0.67rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0.25rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ width: "0.67rem", height: "0.67rem", backgroundColor: "#E3F389", borderRadius: "50%" }} />
        <span>스탬프 적립 중인 매장</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ width: "0.67rem", height: "0.67rem", backgroundColor: "#6970F3", borderRadius: "50%" }} />
        <span>스탬프 미적립 매장</span>
      </div>
    </div>
  );
};

export default StampLegend;
