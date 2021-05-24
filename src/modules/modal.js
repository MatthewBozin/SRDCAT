import Modal from "react-bootstrap/Modal";

const [modalOpen, setModalOpen] = useState(false);

const modalOpening = () => {
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};

return (
  <Modal show={modalOpen} onHide={closeModal}>
    <Modal.Header>
      {modalStat} save: ({character[modalStat]})
    </Modal.Header>
    <Modal.Body>
      Attacker sum:
      {profarray.map((prof) => {
        return (
          <button
            className="button bordered padded5px margin5px"
            onClick={() => {
              test(prof);
            }}
          >
            +{prof}
          </button>
        );
      })}
      <div>{result}</div>
    </Modal.Body>
  </Modal>
);
