// utilitie
import { wrapPromise } from "@/utilities/promise-wrapper";
// services
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";
import { consolidateCourtData } from "@/adapters/court-data.adapter";

export default function fetchCourtsByOwner(userId) {
  const promise = fetchDataOnTable("courts", "owner", userId).then(
    (dataArray) => Promise.all(dataArray.map(consolidateCourtData))
  );
  return wrapPromise(promise);
}
