import { Container } from "react-bootstrap";

const CenteredContainer = ({ children, width }) => {
  return (
    <Container
      className="d-flex justify content-center align-items-center "
      style={{ minHeight: "100vh" }}
    >
      <div className="ms-auto me-auto w-75">{children}</div>
    </Container>
  );
};

export default CenteredContainer;
