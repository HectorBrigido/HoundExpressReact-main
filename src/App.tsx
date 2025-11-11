import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from './components/Footer.tsx';
import GuideRegistrationForm from './components/GuideRegistrationForm.tsx';
import StatusOverview from './components/StatusOverview.tsx';
import GuideList from './components/GuideList.tsx';
import Header from './components/Header.tsx';
import { RootState } from './store/store';
import { updateGuideStatus } from './store/guidesSlice';
import { GuideStatus } from './types';

function App() {
  // Leemos el estado de las guías y el historial desde el store de Redux.
  const { guides, history } = useSelector((state: RootState) => state.guides);
  const dispatch = useDispatch();

  // Función para actualizar el estado de una guía. Se pasa a la lista.
  const handleUpdateStatus = (guideId: string, newStatus: GuideStatus) => {
    dispatch(updateGuideStatus({ guideId, newStatus }));
  };

  // Función para consultar el historial (actualmente solo lo muestra en consola).
  const handleViewHistory = (guideId: string) => {
    const guideHistory = history.filter(entry => entry.guideId === guideId);
    console.log(`Historial para la guía ${guideId}:`, guideHistory);
    const historyText = guideHistory.length > 0
      ? guideHistory.map(entry => `${new Date(entry.timestamp).toLocaleString()}: ${entry.event}`).join('\n')
      : 'No hay historial para esta guía.';
    alert(`Historial para la guía ${guideId}:\n\n${historyText}`);
  };

  // Calculamos las estadísticas. 'useMemo' optimiza el rendimiento
  // para que estos cálculos solo se rehagan si la lista de guías cambia.
  const stats = useMemo(() => {
    // El estado 'guides' ahora viene de useSelector, por lo que useMemo sigue siendo efectivo.
    const inTransit = guides.filter(g => g.status === 'en-transito').length;
    const delivered = guides.filter(g => g.status === 'entregado').length;
    return { total: guides.length, inTransit, delivered };
  }, [guides]);

  return (
    <>
      <Header />
      <main className="container">
        <GuideRegistrationForm />
        <StatusOverview 
          totalGuides={stats.total}
          inTransitGuides={stats.inTransit}
          deliveredGuides={stats.delivered}
        />
        <GuideList guides={guides} onUpdateStatus={handleUpdateStatus} onViewHistory={handleViewHistory}/>
      </main>
      <Footer />
    </>
  )
}

export default App;
