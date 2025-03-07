import { BrowserRouter,  Routes , Route } from "react-router-dom"
import MainPage from './pages/index/index';
import { RecoilRoot } from "recoil";
import BookMarkPage from './pages/bookmark/index'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route  path='/' element={<MainPage />} >
            메인페이지 
          </Route>
          <Route  path='/search/:id' element={<MainPage />} >
            메인페이지 
          </Route>
          <Route  path='/bookmark' element={<BookMarkPage />} >
            북마크
          </Route>          
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App;
