import { useQuery } from "@tanstack/react-query";
import { getMedicalReport } from "../../../services/apiGetMedicalReport";

export function getAllReport(id) {
  const {
    isLoading,
    data: report,
    error,
  } = useQuery({
    queryKey: ["all_report"],
    queryFn: () => getMedicalReport(id),
  });
  return { isLoading, report, error };
}
