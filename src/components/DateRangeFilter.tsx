import React from "react";
import { Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

interface DateRangeFilterProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <Row className="mb-4">
      <Col xs={12} md={6}>
        <label htmlFor="start-date">Start Date:</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={(date: Date | null) => onStartDateChange(date ?? undefined)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
          isClearable
          placeholderText="Select start date"
          className="form-control"
        />
      </Col>
      <Col xs={12} md={6}>
        <label htmlFor="end-date">End Date:</label>
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={(date: Date | null) => onEndDateChange(date ?? undefined)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
          isClearable
          placeholderText="Select end date"
          className="form-control"
        />
      </Col>
    </Row>
  );
};

export default DateRangeFilter;
