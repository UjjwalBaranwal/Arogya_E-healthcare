import { useSelector } from "react-redux";
import { getAllReport } from "./queryReport";
import Table from "../../UI/Table";
import ReportDisplay from "../../UI/ReportDisplay";
import Spinner from "../../UI/Spinner";
import Error from "../../UI/Error";
function MyRecord() {
  const { user } = useSelector((state) => state.auth);
  const patientId = user._id;
  const { isLoading, report, error } = getAllReport(patientId);
  console.log(report);
  //   console.log(report.issues);
  if (isLoading) return <Spinner loading={isLoading} />;
  if (error) return <Error message={error.message} />;
  return (
    <Table columns={"1fr 1fr 2fr 0.5fr"}>
      <Table.Header>
        <div>date</div>
        <div>time</div>
        <div>Doctor Name</div>
      </Table.Header>
      <Table.Body
        data={report}
        render={(report, key) => <ReportDisplay report={report} key={key} />}
      />
    </Table>
  );
}

export default MyRecord;
