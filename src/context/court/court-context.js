import { createContext } from "react";
import CourtModel from "../../models/court.model";

const CourtContext = createContext(new CourtModel());

export default CourtContext;
