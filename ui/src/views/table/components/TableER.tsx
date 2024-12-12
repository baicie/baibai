import React, { useEffect, useRef } from "react";
import G6 from "@antv/g6";

const TableER: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    graphRef.current = new G6.Graph({
      container: containerRef.current,
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
      layout: {
        type: "force",
        preventOverlap: true,
        linkDistance: 100,
      },
    });

    const data = {
      nodes: [],
      edges: [],
    };

    graphRef.current.data(data);
    graphRef.current.render();

    return () => {
      graphRef.current?.destroy();
    };
  }, []);

  return (
    <div className="table-er h-full">
      <div ref={containerRef} className="h-full" />
    </div>
  );
};

export default TableER;
