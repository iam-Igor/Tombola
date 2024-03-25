import { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PrintCards = () => {
  const [generatedcards, setGeneratedCards] = useState(null);
  const params = useParams();
  const componentRef = useRef();
  const navigate = useNavigate();

  const generaNumeroCasuale = (min, max) => {
    const arrayOfNumbers = [];
    for (let i = 0; i < 15; i++) {
      let random = Math.floor(Math.random() * (max - min + 1)) + min;
      do {
        arrayOfNumbers.push(random);
      } while (!arrayOfNumbers.find((n) => n === random));
    }
    return arrayOfNumbers;
  };

  const generateCards = (n) => {
    let arrayOfCards = [];

    for (let i = 0; i < n; i++) {
      arrayOfCards.push(
        <Col className="mini-card col-md-6 col-12">
          {generaNumeroCasuale(1, 90).map((n, i) => {
            return (
              <div key={i} className={`mini-card-numbers mx-2`}>
                {n}
              </div>
            );
          })}
        </Col>
      );
    }

    setGeneratedCards(arrayOfCards);
  };

  useEffect(() => {
    generateCards(params.number);
  }, []);

  const printDocument = () => {
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("cartelle.pdf");
    });
  };

  return (
    <Container transition-style="in:circle:center">
      <h1 className="text-center">Stampa le tue cartelle qui</h1>
      <div className="text-center">
        <Button
          className="rounded-4 shadow-btm btn-success"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
          <i className="bi bi-house ms-2"></i>
        </Button>
        <Button className="rounded-4 shadow-btm ms-2" onClick={printDocument}>
          Stampa <i className="bi bi-printer ms-2"></i>
        </Button>
        <Button
          className="rounded-4 shadow-btm ms-2 btn-warning"
          onClick={() => {
            window.location.reload();
          }}
        >
          Rigenera<i className="bi bi-arrow-clockwise ms-2"></i>
        </Button>
      </div>

      <Row
        className="justify-content-between mt-5 align-items-center"
        ref={componentRef}
      >
        {generatedcards}
      </Row>
    </Container>
  );
};

export { PrintCards };
