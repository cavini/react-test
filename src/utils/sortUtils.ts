export type SortField = 'date' | 'amount';
export type SortOrder = 'asc' | 'desc';

export interface Transaction {
  transactionID: string;
  date: string;
  description: string;
  amount: number;
  parsedDate: Date;
}

/**
 * Sorts an array of transactions based on the specified field and order.
 * @param transactions - The array of transactions to sort.
 * @param sortField - The field to sort by ('date' or 'amount').
 * @param sortOrder - The order to sort ('asc' or 'desc').
 * @returns The sorted array of transactions.
 */
export function sortTransactions(
  transactions: Transaction[],
  sortField: SortField,
  sortOrder: SortOrder
): Transaction[] {
  return [...transactions].sort((a, b) => {
    let fieldA: number;
    let fieldB: number;

    if (sortField === 'date') {
      fieldA = a.parsedDate.getTime();
      fieldB = b.parsedDate.getTime();
    } else {
      fieldA = a.amount;
      fieldB = b.amount;
    }

    if (fieldA < fieldB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (fieldA > fieldB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });
}
