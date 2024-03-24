import React from "react";

import SvgWrapper from "@/components/svg-wrapper";

const ArrowIcon = ({ rotate }) => {
  return (
    <SvgWrapper viewBox={"0 0 25 25"} rotate={rotate}>
      <g clipPath="url(#a)">
        <path d="M9.08 16.763v3.21a.909.909 0 0 1-.637.87c-.391.122-.757.052-1.099-.21-2.754-2.113-5.101-4.417-7.04-6.91-.429-.55-.404-1.111.074-1.684 2.246-2.686 4.599-4.963 7.057-6.83a1.024 1.024 0 0 1 1.645.814v3.278c0 .19.095.292.285.308l14.075 1.024c1.066.08 1.586.655 1.559 1.725l-.034 1.309c-.023 1.054-.56 1.62-1.61 1.696L9.438 16.376c-.24.019-.359.148-.359.387Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h25v25H0z" />
        </clipPath>
      </defs>
    </SvgWrapper>
  );
};

export default ArrowIcon;
