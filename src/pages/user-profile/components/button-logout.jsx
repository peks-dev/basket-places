import React from "react";

const ButtonLogout = ({ onClick }) => {
  return (
    <button className="user-profile__icon-btn-wrap" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="user-profile__icon-btn user-profile__icon-btn--red"
        version="1.0"
        viewBox="0 0 64 64"
      >
        <path d="M18.6 10.5c-5.4 3-10.5 6-11.2 6.6-1.1.9-1.4 4.5-1.4 15V46l4.3 2.8c2.4 1.5 7.8 4.5 11.9 6.7 7.5 3.9 7.7 3.9 9.7 2.1 1.2-1.1 2.1-3.1 2.1-4.8V50h10.4c12.4 0 13.9-.8 13.4-7.4-.4-5.5-3.2-5.8-3.6-.4l-.3 3.8H34V18h19.9l.3 3.7c.4 5.5 3.2 5.2 3.6-.3.5-6.6-1-7.4-13.4-7.4H34v-2.9c0-3-2.2-6.1-4.3-6.1-.7 0-5.6 2.5-11.1 5.5z" />
        <path d="M46 27.4c0 2.1-.5 2.5-3.7 2.8-2.6.2-3.8.8-3.8 1.8s1.2 1.6 3.8 1.8c3.2.3 3.7.7 3.7 2.8 0 1.5.6 2.4 1.6 2.4 1.9 0 10.4-5.7 10.4-7 0-1.3-8.5-7-10.4-7-1 0-1.6.9-1.6 2.4z" />
      </svg>
    </button>
  );
};
export default ButtonLogout;
