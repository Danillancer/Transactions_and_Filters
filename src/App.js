import './App.scss';
import SimpleTable from './pages/Table';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Routes>
        <Route path="/" element={<SimpleTable/>}/>
      </Routes>
    </QueryParamProvider>
  </BrowserRouter>
    </div>
  )
}

export default App;
