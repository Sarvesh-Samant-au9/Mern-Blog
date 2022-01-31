import { useContext } from "react";
import alertContext from "../../Context/Alert/AlertContext";
import Alert from "react-bootstrap/Alert";
const AlertComponent = () => {
  const { alert } = useContext(alertContext);
  return (
    alert && (
      <Alert className="mt-2 text-center" variant={alert.type}>
        {alert.message}
      </Alert>
    )
  );
};
export default AlertComponent;
