import './App.css'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EnteringPage } from './pages/EnteringPage/EnteringPage'
import { MainPage } from './pages/MainPage/MainPage'
import { FollowingsProvider } from './context/FollowingsContext';
import { SongPage } from './pages/SongPage/SongPage';

// import { SettingsProvider } from './context/SettingsContext';
// import { SettingsPage } from './pages/SettingsPage/SettingsPage';

function App() {
   const userExists = localStorage.getItem('user-exist') === 'exist';

   return (
      <HashRouter>
         <FollowingsProvider>
            <Routes>
               {/* Главная страница */}
               <Route
                  path="/"
                  element={
                     userExists ?
                        <Navigate to="/main" replace /> :
                        <Navigate to="/welcome" replace />
                  }
               />

               {/* Страница приветствия */}
               <Route path="/welcome" element={<EnteringPage />} />

               {/* Основные страницы */}
               <Route path="/main" element={<MainPage onlyFollowings={false} />} />
               <Route path="/follow" element={<MainPage onlyFollowings={true} />} />
               <Route path="/song/:id" element={<SongPage />} />
               {/* <Route path="/settings" element={<SettingsPage />} /> */}

               {/* 404 (все неизвестные пути на главную) */}
               <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
         </FollowingsProvider>
      </HashRouter>
   );
}

export default App;