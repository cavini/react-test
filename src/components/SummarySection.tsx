import React from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
interface SummarySectionProps {
  totalTransactions: number;
  totalAmount: number;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  totalTransactions,
  totalAmount,
}) => {
  return (
    <div className="summary mb-4">
      <Row>
        <Col xs={12} md={6}>
          <h5>Total Transactions:</h5>
          <p>
            <strong>{totalTransactions}</strong>
          </p>
        </Col>
        <Col xs={12} md={6}>
          <h5>Total Amount:</h5>
          <p>
            <strong>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalAmount)}
            </strong>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default SummarySection;
