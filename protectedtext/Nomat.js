import { Container, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import errorImage from "../../assets/images/error3.png";
import { parseJwt } from "../../components";

const NoMatch = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const obj = parseJwt(token !== null && token);

  const handleHomePage = () => {
    obj.user.role === "ADMIN" ? navigate("/dashboard") : navigate("/");
  };

  return (
    <>
      <section className="error-section">
        <Container className="text-center">
          <Image className="error-image" src={errorImage} alt="Error Image" />
          <p className="font-weight-bold text-danger paragraph-error-size">
            {" "}
            404 Page Not Found{" "}
          </p>
          <p className="paragraph-error2-size">
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable
          </p>
          <Button onClick={handleHomePage} className="btn error-btn">
            Back to Home Page
          </Button>
        </Container>
      </section>
    </>
  );
};

export default NoMatch;
