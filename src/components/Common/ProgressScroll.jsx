import React, { useEffect } from "react";
import { progressCircleSvg } from "@/data/icons";
//= Scripts
import scrollToTop from "@/common/scrollToTop";

const ProgressScroll = () => {
  useEffect(() => {
    const cleanup = scrollToTop();

    // Cleanup function retornada por scrollToTop
    return cleanup;
  }, []);

  return (
    <div className="progress-wrap cursor-pointer">{progressCircleSvg}</div>
  );
};

export default ProgressScroll;
