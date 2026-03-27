import type { Book } from './Book';

// Represents one line in the shopping cart
export interface CartItem {
  book: Book;
  quantity: number;
}
