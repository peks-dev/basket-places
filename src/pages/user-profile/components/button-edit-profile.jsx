import React from "react";

const ButtonEditProfile = ({ onClick }) => {
  return (
    <button className="user-profile__icon-btn-wrap" onClick={onClick}>
      <svg
        className="user-profile__icon-btn"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3.9 28.097c-.624-.312-1.1-.688-1.453-1.15-.98-1.284-.983-1.316-.935-10.48l.042-8.231.354-.675c.482-.92 1.152-1.6 2.046-2.076l.75-.4 5.346-.044 5.346-.044.392.344c.595.523.655 1.16.166 1.742l-.402.478h-4.976c-5.569 0-5.718.025-6.273 1.059-.255.476-.274 1.04-.274 8.208 0 8.365-.016 8.194.842 8.87.393.308.514.313 8.336.313 8.707 0 8.575.013 9.045-.895.19-.368.227-1.259.227-5.386v-4.946l.388-.462c.47-.559 1.172-.619 1.767-.15l.395.31v5.288c0 6.162-.02 6.28-1.265 7.526-1.302 1.302-.991 1.265-10.588 1.265H4.827l-.927-.464Zm9.475-11.3c-.418-.36-.42-.372-.382-1.987.068-2.8-.47-2.024 5.637-8.123 5.027-5.02 5.472-5.426 5.947-5.426.457 0 .717.203 2.358 1.844 2.688 2.688 3.052 1.825-3.55 8.425l-5.395 5.393-1.093.11c-.601.06-1.545.113-2.097.118-.854.008-1.067-.045-1.425-.353Z" />
      </svg>
    </button>
  );
};

export default ButtonEditProfile;
