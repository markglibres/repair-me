import { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
  z-index: 10;

  .enter-done + & {
    opacity: 1;
    pointer-events: visible;

    .modal-content {
      transform: translateY(0);
    }
  }

  .exit + & {
    opacity: 0;

    .modal-content {
      transform: translateY(-200px);
    }
  }
`;

const ModalContent = styled.div`
  width: 600px;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  transform: translateY(-200px);
`;

const ModalHeader = styled.div`
  padding: 10px;
`;

const ModalFooter = styled.div`
  padding: 10px;
`;
const ModalTitle = styled.h4`
  margin: 0;
`;
const ModalBody = styled.div`
  padding: 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const ModalButton = styled.button`
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 10px 10px;
  border: none;
  cursor: pointer;
  width: 97%;
  opacity: 0.9;
  float: left;

  &:hover {
    opacity: 1;
  }
`;

const CancelButton = styled(ModalButton)`
  background-color: #ccc;
  color: black;
`;

const DeleteButton = styled(ModalButton)`
  background: rgb(255, 0, 0);
`;

interface DeleteConfirmationModalProps {
  onCancel(): any;
  onDelete(): any;
  title: string;
  show: boolean;
}

export const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  onCancel,
  onDelete,
  show,
  children,
  title,
}) => {
  useEffect(() => {
    const closeWhenEscapeKeyPressed = (key: string) => {
      if (key === "Escape") {
        onCancel();
      }
    };

    document.body.addEventListener("keydown", (e) =>
      closeWhenEscapeKeyPressed(e.key)
    );

    return () => {
      document.body.removeEventListener("keydown", (e) =>
        closeWhenEscapeKeyPressed(e.key)
      );
    };
  }, [onCancel]);

  const deleteAndClose = () => {
    onDelete();
    onCancel();
  };

  return ReactDOM.createPortal(
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <Modal onClick={onCancel}>
        <ModalContent onClick={(e: Event) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <DeleteButton onClick={deleteAndClose}>Yes</DeleteButton>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </CSSTransition>,
    document.getElementById("root") as HTMLElement
  );
};
