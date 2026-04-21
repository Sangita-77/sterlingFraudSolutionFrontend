import React, { useRef, useState } from "react";
import "./VizualizationPages.css";
import Draggable from "react-draggable";

import Header from "../Components/header";
import VisualizationCard from "../Components/VisualizationCard";

import Cursor from "../../assets/images/map/Cursor.svg";
import Hand from "../../assets/images/map/Hand.svg";
import Calendar from "../../assets/images/map/CalendarDots.svg";
import MapIcon from "../../assets/images/map/MapPin.svg";

import Keyboard from "../../assets/images/map/Keyboard.svg";
import Info from "../../assets/images/visualization/Info.svg";
import ZoomOut from "../../assets/images/map/MagnifyingGlassMinus.svg";
import ZoomIn from "../../assets/images/map/MagnifyingGlassPlus.svg";

import MapPin from "../../assets/images/map/MapPin.svg";
import BTCAddressModel from "../Components/BTCAddressModel";

interface NodeType {
  id: string;
  x: number;
  y: number;
}

const initialNodes: NodeType[] = [
  { id: "n1", x: 100, y: 100 },
  { id: "n2", x: 300, y: 100 },
  { id: "n3", x: 500, y: 100 },
  { id: "n4", x: 700, y: 100 },
];

const edges = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
  { from: "n3", to: "n4" },
];

const Visualization: React.FC = () => {
  const [mode, setMode] = useState<"cursor" | "pan">("cursor");
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [positions, setPositions] = useState(
    initialNodes.reduce((acc, n) => {
      acc[n.id] = { x: n.x, y: n.y };
      return acc;
    }, {} as Record<string, { x: number; y: number }>)
  );

  const isPanning = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // PAN
  const onMouseDown = (e: React.MouseEvent) => {
    if (mode !== "pan") return;
    isPanning.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isPanning.current) return;

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;

    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isPanning.current = false;
  };

  // NODE DRAG
  const handleDrag = (id: string, data: any) => {
    if (mode !== "cursor") return;

    setPositions((prev) => ({
      ...prev,
      [id]: { x: data.x, y: data.y },
    }));
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Header variant="colored" />

      <div className="viz-card-wrapper">
        <VisualizationCard />
      </div>

      <div className="viz-container">

        {/* Controls */}
        <div className="viz-controls">
          <img src={Cursor} onClick={() => setMode("cursor")} className={`${mode === "cursor" ? "activeControl" : ""} `} />
          <img src={Hand} onClick={() => setMode("pan")} className={`${mode === "pan" ? "activeControl" : ""}`} />
          <img src={Calendar} />
          <img src={MapIcon} />
        </div>

        {/* MAP */}
        <div
          className="viz-map"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{ cursor: mode === "pan" ? "grab" : "default" }}
        >
          <div
            className="viz-transform"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            }}
          >
            {/* SVG ARROWS */}
            <svg className="viz-svg">
              <defs>
                <marker
                  id="arrow"
                  markerWidth="10"
                  markerHeight="10"
                  refX="10"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill="#242889" />
                </marker>
              </defs>

              {edges.map((e, i) => {
                const from = positions[e.from];
                const to = positions[e.to];

                const midX = (from.x + 30 + to.x) / 2;
                const midY = (from.y + 30 + to.y + 30) / 2;

                return (
                  <g key={i}>
                    <line
                      x1={from.x + 30}
                      y1={from.y + 30}
                      x2={to.x}
                      y2={to.y + 30}
                      stroke="#242889"
                      strokeWidth={1}
                      markerEnd="url(#arrow)"
                    />
                    <text
                      x={midX}
                      y={midY - 5}
                      fontSize="16"
                      fill="#7D7D7D"
                      textAnchor="middle"

                    >
                      1654654.52
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* NODES */}
            {initialNodes.map((node, i) => {
              const ref = useRef(null);
              return (
                <>
                  <Draggable
                    key={node.id}
                    nodeRef={ref}
                    position={positions[node.id]}
                    onDrag={(e, data) => handleDrag(node.id, data)}
                  >
                    <div ref={ref} className="viz-node" onClick={()=>setOpen(true)}>
                      <img src={MapPin} className="node-icon" />
                      <div className="node-label">JKF24G</div>
                    </div>
                  </Draggable>

                </>
              );
            })}
          </div>
        </div>
        {/* Bottom Controls */}
        <div className="viz-controls ">
          <img src={Keyboard} />
          <img src={Info} />
          <img src={ZoomOut} onClick={() => setScale((s) => Math.max(0.5, s - 0.1))} />
          <img src={ZoomIn} onClick={() => setScale((s) => Math.min(2, s + 0.1))} />
        </div>
      </div>
      {/* BTC Address Model */}
       <BTCAddressModel
        isOpen={open}
        onClose={() => setOpen(false)}
        address="NIUL78OF NUNFX8W8TMX3849T3TPO3ISDF"
      />
    </>
  );
};

export default Visualization;


