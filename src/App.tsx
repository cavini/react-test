import React, { useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import { useGetTransactionData } from "./hooks/useGetTransactionData";
import TransactionCard from "./components/TransactionCard";
import PaginationControls from "./components/PaginationControls";
import SortingControls from "./components/SortingControls";
import DateRangeFilter from "./components/DateRangeFilter";
import SummarySection from "./components/SummarySection";
import { parseTransactionDate, normalizeDate } from "./utils/dateUtils";
import {
  sortTransactions,
  SortField,
  SortOrder,
  Transaction,
} from "./utils/sortUtils";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { data: transactions, loading, error } = useGetTransactionData();

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 12;

  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const transactionsWithParsedDates: Transaction[] = useMemo(() => {
    return transactions.map((transaction) => {
      const parsedDate = parseTransactionDate(transaction.date);

      return {
        ...transaction,
        parsedDate,
      };
    });
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactionsWithParsedDates.filter((transaction) => {
      const transactionDate = normalizeDate(transaction.parsedDate).getTime();
      const start = startDate ? normalizeDate(startDate).getTime() : null;
      const end = endDate ? normalizeDate(endDate).getTime() : null;

      const isAfterStartDate = start ? transactionDate >= start : true;
      const isBeforeEndDate = end ? transactionDate <= end : true;

      return isAfterStartDate && isBeforeEndDate;
    });
  }, [transactionsWithParsedDates, startDate, endDate]);

  const sortedTransactions = useMemo(() => {
    return sortTransactions(filteredTransactions, sortField, sortOrder);
  }, [filteredTransactions, sortField, sortOrder]);

  const totalTransactions = sortedTransactions.length;
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

  const currentTransactions = useMemo(() => {
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction =
      indexOfLastTransaction - transactionsPerPage;
    return sortedTransactions.slice(
      indexOfFirstTransaction,
      indexOfLastTransaction
    );
  }, [sortedTransactions, currentPage, transactionsPerPage]);

  const totalAmount = useMemo(() => {
    return filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  }, [filteredTransactions]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSortFieldChange = (field: SortField) => {
    setSortField(field);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (order: SortOrder) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  return (
    <Container>
      <h1 className="my-4">Transaction List</h1>

      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <SortingControls
        sortField={sortField}
        sortOrder={sortOrder}
        onSortFieldChange={handleSortFieldChange}
        onSortOrderChange={handleSortOrderChange}
      />

      <SummarySection
        totalTransactions={filteredTransactions.length}
        totalAmount={totalAmount}
      />

      {currentTransactions.length > 0 ? (
        <Row>
          {currentTransactions.map((transaction) => (
            <Col
              key={transaction.transactionID}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >
              <TransactionCard transaction={transaction} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No transactions found for the selected date range.</p>
      )}

      {totalPages > 1 && (
        <>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
}

export default App;
