import React, { useEffect, useState, useCallback } from 'react';

import { styles } from '../styles/index';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
/* import { firebaseConfig } from '../config/firebase'; */
import { firebaseConfig } from '../config/firebase.config';
import { initializeApp } from 'firebase/app';
/* import { useFocusEffect, useRoute } from '@react-navigation/native'; */
import { getAuth } from 'firebase/auth';
/* import { Button } from '@mui/material'; */
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button/Button';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface ITableData {
  date: string;
  id: string;
  name: string;
  prompt: string;
}

interface Prompt {
  date: string;
  name: string;
  prompt: string;
  user: {
    uid: string;
  };
}

export const DashboardScreen = () => {
  const [prompts, setPrompts] = useState<ITableData[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [newPromptName, setNewPromptName] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado de loading

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return unsubscribe;
  }, []);

  const getPrompts = useCallback(async () => {
    try {
      if (userId) {
        const collectionRef = collection(db, 'prompts');
        /* const myQuery = query(collectionRef, where('user', '==', userId)); */
        const myQuery = query(collectionRef, where('user.uid', '==', userId));

        const snapshot = await getDocs(myQuery);
        const promptsCol: ITableData[] = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as ITableData)
        );
        setPrompts(promptsCol);
        /* console.log('prompts:::', promptsCol); */
      }
    } catch (error) {
      console.log(error);
      return (
        <Alert variant="filled" severity="error">
          Erro ao buscar os prompts. Verifique sua conexão e tente novamente
          mais tarde.
        </Alert>
      );
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
  }, [db, userId]);

  useEffect(() => {
    setIsLoading(true); // Inicia o loading
    getPrompts();
  }, [getPrompts, userId]);

  // Função para deletar um prompt
  const handleDeletePrompt = async (id: string) => {
    try {
      setIsLoading(true);
      console.log('Excluindo o registro: ', id);
      await deleteDoc(doc(db, 'prompts', id));
      const updatedPrompts = prompts.filter((p) => p.id !== id);
      setPrompts(updatedPrompts);
      return (
        <Alert variant="filled" severity="success">
          Prompt excluído.
        </Alert>
      );
    } catch (error) {
      console.log(error);
      return (
        <Alert variant="filled" severity="error">
          Erro ao excluir prompts. Verifique sua conexão e tente novamente mais
          tarde.
        </Alert>
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRenamePrompt = async (id: string) => {
    try {
      const promptDoc = doc(db, 'prompts', id);
      await updateDoc(promptDoc, { name: newPromptName });
      setPrompts((prompts) =>
        prompts.map((prompt) =>
          prompt.id === id ? { ...prompt, name: newPromptName } : prompt
        )
      );
      setNewPromptName('');
      handleRenameModalClose();
      return (
        <Alert variant="filled" severity="success">
          Prompt renomeado.
        </Alert>
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenameModalClose = () => {
    setSelectedPromptId(null);
    setShowRenameModal(false);
  };
  console.log(prompts);
  return (
    <div style={styles.container}>
      <span style={styles.title}>Prompts Salvos</span>
      <div style={styles.containerView}>
        {isLoading ? (
          <CircularProgress size="md" />
        ) : (
          <>
            <div style={styles.containerView}>
              {prompts.map((item) => (
                <div>
                  <div>
                    <h3 style={styles.titleSmall}>{item.name}</h3>
                    <p>{item.prompt}</p>
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedPromptId(item.id);
                      setShowRenameModal(true);
                    }}
                    variant="contained"
                  >
                    Renomear
                  </Button>
                  <Button
                    variant="contained"
                    color="info" /* bg={'purple.900'} */
                  >
                    PDF
                  </Button>
                  <Button style={{ marginRight: '5px' }}>Copiar</Button>
                  <Button onClick={() => handleDeletePrompt(item.id)}>
                    Excluir
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
