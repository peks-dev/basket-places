import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// context
import { useUserStore } from "@/context/userStore";
import { useToastStore } from "@/context/toastStore";
// hooks
import { useSendReview } from "@/hooks/use-send-review.hook";
// components
import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import ReviewForm from "./review-form/review-form";
import LoaderBtn from "@/components/loader-btn/loader-btn";

const CommentButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const { loading, error, success, sendCourtReview } = useSendReview();
  const { profile } = useUserStore();
  const { createToast } = useToastStore();
  const navigate = useNavigate();
  const courtId = useParams().courtId;

  function handleModal() {
    if (profile.id) {
      setComment("");
      setRating("");
      setShowModal((prevState) => !prevState);
    } else {
      navigate("/login");
    }
  }

  async function handleSendForm() {
    await sendCourtReview(courtId, profile.id, rating, comment);
    handleModal();
  }

  useEffect(() => {
    if (success) {
      console.log(success);
      createToast(success, "success");
    }
    if (error) {
      console.log(error);
      createToast(error.message, "error");
    }
  }, [success, error]);

  return (
    <>
      <Button type={"button"} onClick={handleModal}>
        comentar
      </Button>
      {showModal ? (
        <Modal
          onCancel={handleModal}
          confirmBtnChild={loading ? <LoaderBtn /> : "enviar"}
          onConfirm={handleSendForm}
        >
          <h4 className="modal__title">valora!</h4>
          <ReviewForm
            comment={comment}
            setComment={setComment}
            rating={rating}
            setRating={setRating}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default CommentButton;
