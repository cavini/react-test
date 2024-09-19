import React from "react";
import { SortField, SortOrder } from "../utils/sortUtils";
import { Row, Col } from "react-bootstrap";

interface SortingControlsProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSortFieldChange: (field: SortField) => void;
  onSortOrderChange: (order: SortOrder) => void;
}

const SortingControls: React.FC<SortingControlsProps> = ({
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
}) => {
  return (
    <Row className="mb-4">
      <Col xs={12} md={6}>
        <label htmlFor="sort-field">Sort By:</label>
        <select
          id="sort-field"
          value={sortField}
          onChange={(e) => onSortFieldChange(e.target.value as SortField)}
          className="form-control"
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
      </Col>
      <Col xs={12} md={6}>
        <label htmlFor="sort-order">Order:</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
          className="form-control"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </Col>
    </Row>
  );
};

export default SortingControls;
