import React from "react";
import "./prueba.css";

import Button from "@/components/button/button";
import Loader from "../../components/loader/loader";
import LoaderBtn from "@/components/loader-btn/loader-btn";

import { useUserStore } from "@/context/userStore";

const MiComponente = () => {
  const { profile, refreshProfile } = useUserStore();

  return (
    <div style={{ height: "100dvh" }}>
      <p>hola</p>
      <Button variant={"primary"} onClick={refreshProfile}>
        actualizar
      </Button>
    </div>
  );
};

export default MiComponente;
