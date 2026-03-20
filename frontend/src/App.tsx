import 'bootstrap/dist/css/bootstrap.min.css';
import BookList from './components/BookList';

function App() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Online Bookstore</h1>
      <BookList />
    </div>
  );
}

export default App;
