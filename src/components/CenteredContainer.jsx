import { Container } from "react-bootstrap";

const CenteredContainer = ({ children }) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ width: "90%" }}>
        {children}
      </div>
    </Container>
  );
};

export default CenteredContainer;
