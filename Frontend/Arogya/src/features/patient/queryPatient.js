import { useQuery } from "@tanstack/react-query";
import { getAllDoctor } from "../../../services/apitForPatient";
import { useSearchParams } from "react-router-dom";

export function getAllDoctors() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("specialization");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "specialization",
          value: filterValue,
        };
  const rawSort = searchParams.get("sortBy");
  const [field, direction] = rawSort.split("-");
  const sortBy = { field, direction };
  const {
    isLoading,
    data: doctor,
    error,
  } = useQuery({
    queryKey: ["all Doctor", filterValue, sortBy],
    queryFn: () => getAllDoctor({ filter, sortBy }),
  });
  return { isLoading, doctor, error };
}
