import { useQuery } from "@tanstack/react-query";
import { getAllDoctor } from "../../../services/apitForPatient";

export function getAllDoctors() {
  const {
    isLoading,
    data: doctor,
    error,
  } = useQuery({
    queryKey: ["all Doctor"],
    queryFn: getAllDoctor,
  });
  return { isLoading, doctor, error };
}
