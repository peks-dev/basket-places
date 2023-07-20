import * as React from "react";
const ImgIcon = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="form__progress-icon"
    viewBox="0 0 64 64"
    preserveAspectRatio="xMidYMid meet"
    fill={color}
  >
    <path d="M3.3 7.8C.7 9.4 0 14.7 0 32.4c0 20.7.7 23.9 5.2 25.5 4.1 1.5 49.5 1.5 53.6 0 4.5-1.6 5.2-4.8 5.2-25.5 0-17.7-.7-23-3.3-24.6-1.6-1-55.8-1-57.4 0zM59.8 21l.3 10.5H49.8c-9 0-11 .4-15.9 2.6-7.1 3.3-12.3 8.5-15.7 15.7-2.5 5.3-3 5.7-6.4 6-2.1.2-4.6-.2-5.8-.8-1.9-1-2-1.9-2-22.4 0-11.7.3-21.6.7-21.9.4-.4 12.8-.6 27.7-.5l27.1.3.3 10.5z" />
    <path d="M12.2 18.3c-4.8 5.1-1.1 14 5.8 14 7 0 10.8-9.3 5.7-14.1-3.2-3-8.7-2.9-11.5.1z" />
  </svg>
);
export default ImgIcon;
