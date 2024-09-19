import React from "react";
import { Card } from "react-bootstrap";
import { Transaction } from "../utils/sortUtils";

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{transaction.description}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {transaction.parsedDate.toLocaleDateString()}
        </Card.Subtitle>
        <Card.Text>
          <strong>ID:</strong> {transaction.transactionID}
          <br />
          <strong>Amount:</strong>{" "}
          <span
            style={{
              color: transaction.amount >= 0 ? "green" : "red",
            }}
          >
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(transaction.amount)}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TransactionCard;
