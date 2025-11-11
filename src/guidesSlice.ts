import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guide, GuideStatus, HistoryEntry } from './types';

// Datos de ejemplo que antes estaban en App.tsx
const initialGuides: Guide[] = [
  { id: 'HE-123456789', status: 'entregado', origin: 'Bogotá', destination: 'Medellín', lastUpdate: '2023-10-26' },
  { id: 'HE-987654321', status: 'en-transito', origin: 'Cali', destination: 'Barranquilla', lastUpdate: '2023-10-27' },
  { id: 'HE-112233445', status: 'pendiente', origin: 'Cartagena', destination: 'Bucaramanga', lastUpdate: '2023-10-28' },
];

interface GuidesState {
  guides: Guide[];
  history: HistoryEntry[];
}

const initialState: GuidesState = {
  guides: initialGuides,
  history: [],
};

const guidesSlice = createSlice({
  name: 'guides',
  initialState,
  reducers: {
    addGuide: (state, action: PayloadAction<Guide>) => {
      // Verificamos que no exista una guía con el mismo ID
      if (state.guides.some(guide => guide.id.toLowerCase() === action.payload.id.toLowerCase())) {
        alert(`Error: La guía con el ID "${action.payload.id}" ya existe.`);
        return;
      }
      state.guides.unshift(action.payload); // Agrega al inicio del array
      // Agregamos un evento al historial.
      state.history.push({
        guideId: action.payload.id,
        event: `Guía registrada. Origen: ${action.payload.origin}, Destino: ${action.payload.destination}`,
        timestamp: new Date().toISOString(),
      });
    },
    updateGuideStatus: (state, action: PayloadAction<{ guideId: string; newStatus: GuideStatus }>) => {
      const { guideId, newStatus } = action.payload;
      const guideIndex = state.guides.findIndex(guide => guide.id === guideId);
      if (guideIndex !== -1) {
        state.guides[guideIndex].status = newStatus;
        state.guides[guideIndex].lastUpdate = new Date().toISOString();
        // Agregamos un evento al historial.
        state.history.push({
          guideId,
          event: `Estado actualizado a: ${newStatus}`,
          timestamp: new Date().toISOString(),
        });
      }
    },
  },
});

export const { addGuide, updateGuideStatus } = guidesSlice.actions;

export default guidesSlice.reducer;