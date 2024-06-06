import {PaginatedResponse} from '@core/models/paginated-response.model';
import {Transaction} from '@core/models/transaction.model';

export type TransactionsPage = PaginatedResponse<Transaction>;
