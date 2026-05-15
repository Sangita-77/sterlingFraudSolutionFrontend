import React from "react";

interface PieData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieData[];
  size?: number;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 220,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let currentPercent = 0;

  const gradient = data
    .map((item) => {
      const start = currentPercent;
      const end = currentPercent + (item.value / total) * 100;

      currentPercent = end;

      return `${item.color} ${start}% ${end}%`;
    })
    .join(",");

  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Pie */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `conic-gradient(${gradient})`,
          position: "relative",
        }}
      >
        {/* Donut center */}
        <div
          style={{
            width: size * 0.55,
            height: size * 0.55,
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 600,
            fontSize: "18px",
          }}
        >
          {total}
        </div>
      </div>

      {/* Legend */}
      <div>
        {data.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: item.color,
              }}
            />
            <span>
              {item.label} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;