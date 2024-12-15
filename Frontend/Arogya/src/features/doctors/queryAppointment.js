import { useQuery } from "@tanstack/react-query";
import { appointmentByDoctorID } from "../../../services/apiAppointmentByDoctorID";

export function getAllAppointment(id) {
  const {
    isLoading,
    data: appointment,
    error,
  } = useQuery({
    queryKey: ["all appointment"],
    queryFn: () => appointmentByDoctorID(id),
  });
  return { isLoading, appointment, error };
}
