import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { Layout } from './pages/Layout/Layout';
import { FormPage } from './pages/FormPage/FormPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/add_book' element={<FormPage />} />
        <Route path='/edit_book/:bookId' element={<FormPage />} />
      </Route>
    </Routes>
  );
}

export default App;
