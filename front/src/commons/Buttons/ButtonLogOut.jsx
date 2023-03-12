import Button from "react-bootstrap/Button";
import style from "../../assets/styles/commons/ButtonLogOut.module.scss";

function ButtonLogOut() {
  return (
    <div>
      <Button className={style["ButtonLogOut"]} variant="outline-primary">
        Cerrar Sesion
      </Button>{" "}
    </div>
  );
}

export default ButtonLogOut;
