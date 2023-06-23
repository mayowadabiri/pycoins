import Modal from "./Modal";
import deleteImg from "../../assets/delete.svg";
import Button from "./Button";

const Delete = ({ close, mutate, isLoading, text }) => {
  return (
    <Modal close={close}>
      <div className="remove">
        <img src={deleteImg} alt="Delete" />
        <p className="title">Are you sure?</p>
        <p className="title title-grey ta">{text}</p>
        <Button
          isLoading={isLoading}
          onclick={() => mutate()}
          bg={"button_remove"}
        >
          Continue to Delete
        </Button>
      </div>
    </Modal>
  );
};

export default Delete;
