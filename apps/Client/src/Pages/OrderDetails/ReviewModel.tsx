import Modal from "react-modal";
import * as React from "react";
import { FormControl, Input, Form } from "../../StyledComponents/FormControl";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IconButton, ReviewButton } from "./StyledOrderDeatails";
import { usePostReview } from "../../API/ReviewAPI";
import LoadingButton from "../../Components/LoadingButton";

const customStyles = {
  content: {
    width: "50vw",
    padding: "2rem",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    backgroundColor: "var(--bg-color)",
    transform: "translate(-50%, -50%)",
  },
};

function ReviewModel({
  ProductID,
  OrderID,
}: {
  ProductID: string;
  OrderID: string;
}) {
  const { mutate, isLoading, isSuccess } = usePostReview();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const MakeReview = (e: any) => {
    e.preventDefault();

    mutate({
      OrderID,
      ProductID,
      review: {
        comment: e.target.elements.comment.value,
        rating: e.target.elements.rating.value,
      },
    });
  };
  return (
    <>
      <ReviewButton className="btn" onClick={openModal}>
        Review
      </ReviewButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Review Modal"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {!isLoading && (
            <IconButton onClick={closeModal} className="btn">
              close
              <AiOutlineCloseCircle />
            </IconButton>
          )}
        </div>
        <div>
          <Form onSubmit={MakeReview}>
            <FormControl>
              <label htmlFor="comment">Comment</label>
              <textarea
                name="comment"
                id="comment"
                style={{
                  resize: "none",
                }}
                rows={10}
                required
              />
            </FormControl>
            <FormControl
              style={{
                width: "50%",
              }}
            >
              <label htmlFor="rating">Rating</label>
              <Input
                type="number"
                name="rating"
                id="rating"
                min="1"
                max="5"
                required
              />
            </FormControl>
            <LoadingButton isLoading={isLoading} className="btn">
              Submit Review
            </LoadingButton>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default ReviewModel;
