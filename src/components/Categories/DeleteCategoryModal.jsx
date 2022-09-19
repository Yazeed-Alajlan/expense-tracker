import { Modal, Button } from "react-bootstrap";
import { useCategories } from "contexts/CategoriesContext";
import { FaRegTimesCircle } from "react-icons/fa";

const DeleteCategoryModal = ({ show, handleClose, categorId }) => {
  const { deleteCategory } = useCategories();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="contianer d-flex justify-content-center align-items-center flex-column gap-4">
        <FaRegTimesCircle className=" display-1 text-danger border-1" />
        <h2>Are you sure?</h2>
        <p className="text-center text-muted mx-4">
          Do you really want to delete this category? This process cannot be
          undone.
        </p>
        {/* <Button variant="secondary">Cancel</Button> */}
        <Button
          variant="danger"
          onClick={() => {
            deleteCategory(categorId);
          }}
        >
          Delete
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCategoryModal;
