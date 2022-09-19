import { useState } from "react";
import { Card, Stack, ProgressBar, Dropdown } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import DeleteCategoryModal from "./DeleteCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

const CategoryCard = ({ name, amount, max, icon, id }) => {
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const classNames = [];
  if (amount > max) {
    classNames.push(
      "category-card border-0 rounded-4 shadow-sm",
      "bg-danger",
      "bg-opacity-10"
    );
  } else {
    classNames.push("category-card border-0 rounded-4 shadow-sm");
  }
  function getProgressBarVariant(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "success";
    if (ratio < 0.75) return "warning";
    return "danger";
  }
  return (
    <>
      <Card className={classNames.join(" ")}>
        <Stack direction="column">
          <div className="d-flex justify-content-between align-content-center m-4">
            <div className="category-card-icon d-flex justify-content-center align-items-center ">
              <p className="fs-1 ">{icon}</p>
            </div>
            <Dropdown className="my-4">
              <Dropdown.Toggle id="dropdown-basic">
                <FaEllipsisV />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setShowEditCategoryModal(true);
                  }}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setShowDeleteCategoryModal(true);
                  }}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="card-content m-4">
            <div className="d-flex align-items-baseline fs-4">
              ${amount} <span className="text-muted fs-6 ms-1">/ ${max}</span>
            </div>
            <p className="text-muted fs-5">{name}</p>
          </div>
          <ProgressBar
            className="rounded-pill m-4"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        </Stack>
      </Card>
      <DeleteCategoryModal
        categorId={id}
        show={showDeleteCategoryModal}
        handleClose={() => setShowDeleteCategoryModal(false)}
      />
      <EditCategoryModal
        categorId={id}
        name={name}
        max={max}
        show={showEditCategoryModal}
        handleClose={() => setShowEditCategoryModal(false)}
      />
    </>
  );
};

export default CategoryCard;
