import { Container } from "react-bootstrap";

const CenteredContainer = ({ children }) => {
  return (
    <Container
      className="d-flex justify content-center align-items-center space layer1 "
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <div className="ms-auto me-auto w-lg-50 w-75">{children}</div>
    </Container>
  );
};

export default CenteredContainer;
