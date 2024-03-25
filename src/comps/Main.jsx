import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [numbers, setNumbers] = useState([]);
  const [extractedNumbers, setExtractedNumbers] = useState([]);
  const [extractedNumber, setExtractedNumber] = useState(0);
  const [numberOfCards, setNumberOfCards] = useState(0);

  const [showEndModal, setShowEndModal] = useState(false);

  const navigate = useNavigate();

  const title = ["T", "O", "M", "B", "O", "L", "A"];

  const [showMenu, setShowMenu] = useState(false);

  const [show, setShow] = useState(false);

  const getNumbers = () => {
    const numeriDaUnoANovanta = [];
    for (let i = 1; i <= 90; i++) {
      numeriDaUnoANovanta.push(i);
    }
    setNumbers(numeriDaUnoANovanta);
  };

  const checkExistingNumber = (number) => {
    if (extractedNumbers.find((n) => n === number)) {
      return false;
    } else {
      return true;
    }
  };

  const showExtractedNumber = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1500);
  };

  const extractNumber = () => {
    let rndmNumber = Math.floor(Math.random() * 90) + 1;

    if (extractedNumbers.length === 89) {
      console.log("finito");
      setShowEndModal(true);
      return false;
    } else {
      if (checkExistingNumber(rndmNumber)) {
        setExtractedNumber(rndmNumber);
        setExtractedNumbers([...extractedNumbers, rndmNumber]);
        showExtractedNumber();
      } else {
        extractNumber();
      }
    }
  };

  const setNumberColored = (number) => {
    if (extractedNumbers.find((n) => n === number)) {
      return "color";
    } else {
      return "";
    }
  };

  const generateCards = (n) => {
    setShowMenu(false);
    navigate("/print/" + n);
  };

  useEffect(() => {
    if (numbers.length <= 0) {
      getNumbers();
    }
  }, []);

  return (
    <Container fluid className="pb-5" transition-style="in:circle:center">
      <Row className="justify-content-center main-row">
        <div
          onClick={() => {
            setShowMenu(true);
          }}
          className="pointer"
        >
          <i className="bi bi-list fs-1"></i>
        </div>
        {numbers && (
          <Col className="main-col p-0 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex title-div mt-3">
              {title.map((l, i) => {
                return (
                  <h1
                    key={i}
                    style={{
                      animation: `roll-in-left 0.6s ${
                        (title.length - i - 1) * 0.2
                      }s ease-out both`,
                    }}
                  >
                    {l}
                  </h1>
                );
              })}
            </div>
            <div className="parent-numbers">
              {numbers.map((n, i) => {
                return (
                  <div key={i} className={`number-cont ${setNumberColored(n)}`}>
                    {n}
                  </div>
                );
              })}
            </div>
          </Col>
        )}
        <Col className="d-md-flex flex-column col-12 col-md-3 text-white">
          <h3 className="text-black text-center mt-3 mt-md-0">
            Ultimi numeri estratti
          </h3>
          <div className="last-numbers d-flex mb-5">
            {extractedNumbers.length > 0 &&
              extractedNumbers.slice(-5, -1).map((n, i) => {
                return <div key={i}>{n}</div>;
              })}
          </div>

          <div className="text-center">
            <Button
              className="rounded-5 fs-3 btn-success shadow-btm mt-5 py-3"
              onClick={() => {
                extractNumber();
              }}
            >
              Estrai
            </Button>
          </div>
        </Col>
      </Row>

      <Modal
        show={show}
        className={`d-flex justify-content-center ${
          show ? "slide-in" : "slide-out"
        }`}
      >
        <Modal.Body>
          <h1 className="m-0">{extractedNumber}</h1>
        </Modal.Body>
      </Modal>
      <Offcanvas
        show={showMenu}
        onHide={() => {
          setShowMenu(false);
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <div className="mb-5">
            <h5>Genera cartelle</h5>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                generateCards(numberOfCards);
              }}
            >
              <Form.Select
                required
                onChange={(e) => {
                  setNumberOfCards(parseInt(e.target.value));
                }}
              >
                <option>Quante cartelle?</option>
                <option value="1">Una</option>
                <option value="2">Due</option>
                <option value="3">Tre</option>
                <option value="4">Quattro</option>
              </Form.Select>
              <Button
                type="submit"
                className="rounded-4 shadow-btm btn-warning mt-3"
              >
                Genera
              </Button>
            </Form>
          </div>
          <hr></hr>
          <div>
            <Button
              className="btn-danger rounded-5 shadow-btm"
              onClick={() => {
                if (window.confirm("Sei sicuro di voler ricominciare?")) {
                  window.location.reload();
                }
              }}
            >
              Ricomincia
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal
        className="modal-end"
        show={showEndModal}
        onHide={() => {
          setShowEndModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Partita finita!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Clicca sul bottone per ricominciare</Modal.Body>
        <Modal.Footer>
          <Button
            variant="success rounded-4 shadow-btm"
            onClick={() => {
              setShowEndModal(false);
              window.location.reload();
            }}
          >
            Ricomincia
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export { Main };
