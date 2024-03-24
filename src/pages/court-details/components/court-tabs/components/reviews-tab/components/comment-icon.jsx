import * as React from "react";
const CommentIcon = ({ color }) => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#a)">
      <path
        d="M7.85 2C3.77 2.44 1.38 4.15.74 7.07.66 7.44.57 8.36.54 9.1c-.07 1.48.08 2.72.46 3.73.51 1.36 1.96 3 3.15 3.58.69.33.71.34 2.36.37 1.85.04 3.73-.12 6.68-.56l1.81-.28 1.78.93c.97.51 1.84.96 1.93.98.19.06.23-.19.38-2.45.19-2.73.23-5.15.12-6.75-.17-2.51-.42-3.16-1.74-4.54-.95-.98-2.06-1.54-3.82-1.93-1.03-.22-4.43-.33-5.8-.18Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={color} transform="translate(.1)" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default CommentIcon;
