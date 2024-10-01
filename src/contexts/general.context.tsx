import React, { createContext, useContext, useState } from 'react';
import { Note } from '../types/note.interface';
import { NoteCollection } from '../types/noteCollection.interface';
import { Icon } from '@primer/octicons-react';
import { noteCollections, notes } from '../services/http.service';

interface GeneralProviderProps extends React.PropsWithChildren<{}> {}
interface GeneralContextData {
  notesData: Note[];
  noteCollectionsData: NoteCollection[];
  loading: boolean;
  fetchAllData: () => Promise<void>;
  flashVisible: boolean;
  flashMessage: string;
  flashIcon: Icon | null;
  flashVariant: 'default' | 'success' | 'warning' | 'danger';
  handleFlash: (
    message: string,
    icon?: Icon,
    variant?: 'default' | 'success' | 'warning' | 'danger'
  ) => void;
}

const GeneralContext = createContext<GeneralContextData | null>(null);

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useGeneralContext must be used within a GeneralProvider');
  }
  return context;
};

export const GeneralProvider: React.FC<GeneralProviderProps> = ({
  children,
}) => {
  const [notesData, setNotesData] = useState<Note[]>([]);
  const [noteCollectionsData, setNoteCollectionsData] = useState<
    NoteCollection[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllData = async () => {
    const allNotesResponse = await notes.getAll();
    setNotesData(allNotesResponse.data);

    const allNoteCollectionsResponse = await noteCollections.getAll();
    setNoteCollectionsData(allNoteCollectionsResponse.data);

    setLoading(false);
  };

  const [flashVisible, setFlashVisible] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashIcon, setFlashIcon] = useState<Icon | null>(null);
  const [flashVariant, setFlashVariant] = useState<
    'default' | 'success' | 'warning' | 'danger'
  >('default');

  const handleFlash = (
    message: string,
    icon?: Icon,
    variant?: 'default' | 'success' | 'warning' | 'danger'
  ) => {
    setFlashMessage(message);
    setFlashVariant(variant || 'default');
    setFlashIcon(icon || null);
    setFlashVisible(true);

    setTimeout(() => {
      setFlashVisible(false);
    }, 10000);
  };

  return (
    <GeneralContext.Provider
      value={{
        notesData,
        noteCollectionsData,
        loading,
        fetchAllData,
        flashVisible,
        flashMessage,
        flashIcon,
        flashVariant,
        handleFlash,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
