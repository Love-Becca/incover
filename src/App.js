// import RecordsTable from "./Registered";
import LandingPage from './LandingPage';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import Footer from './Footer';



function App() {
  return (
    <div className="App">
      <Header />
      <LandingPage />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
