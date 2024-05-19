import React, { useEffect, useState } from 'react';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
/* import { firebaseConfig } from '../config/firebase'; */
import { firebaseConfig } from '../config/firebase.config';

import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
  getFirestore,
  query,
  where
} from 'firebase/firestore';

import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import logo from '../assets/images/logo_pam_full.png';
/* import { Button } from './../components/Button'; */

interface Prompt {
  date: string;
  name: string;
  prompt: string;
  user: {
    uid: string;
  };
}

export const HomeScreen = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  /* const navigation = useNavigation(); */
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('usuario saiu');
      })
      .catch((error) => {
        console.log('Error logging out: ', error);
      });
  };

  const handleNavigation = () => {
    /* const navDashboard = navigation.navigate('DashboardScreen') */
  };

  //conexao com o Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const promptsRef = doc(db, 'prompts' /* , '89R64A0ISVO3tihd0l7T' */);

  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    console.log('user==> ', user);
    console.log('user email==> ', user.email);
    console.log('user uid==> ', user.uid);
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
  } else {
    // No user is signed in.
  }

  const getPrompts = async () => {
    try {
      const docSnap = await getDoc(promptsRef);
      if (docSnap.exists()) {
        const promptData = docSnap.data() as Prompt;
        console.log('Document data:', promptData);
        setPrompts([promptData]);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }
  };

  const handleAddPrompt = async () => {
    const promptsRef = collection(db, 'prompts');

    try {
      const newPromptRef = await addDoc(promptsRef, {
        id: 'V9l1tAgWFSe3HGsNelpr5DfI3v02',
        data: '05-05-05',
        name: 'Novo Teste prompt',
        prompt: 'PabloAzevedo prompt prompt prompt prompt prompt',
        user: {
          uid: user ? user.uid : null /* 'GCT89ZChGfhqh32vnqoMrVXhGX52' */
        }
      });
      console.log('Document written with ID: ', newPromptRef.id);
      console.log('newPromptRef: ', newPromptRef);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  useEffect(() => {
    getPrompts();
  }, []);

  return (
    <div /* style={styles.container} */>
      {user && (
        <>
          <div>
            <Box>
              <img src={logo} alt="Logo" />
            </Box>
          </div>
          <div>
            {prompts.map((prompt) => (
              <div key={prompt.date}>
                <p>
                  {' '}
                  <p style={{ fontWeight: 'bold' }}>Login:</p> {user.email}
                </p>
                <p>
                  {' '}
                  <p style={{ fontWeight: 'bold' }}>ID usuario:</p> {user.uid}
                </p>
                <p>{''}</p>
              </div>
            ))}
          </div>
          <div /* style={styles.containerBtns} */></div>
          <Button
          /* onClick={() => {
          navigation.navigate('DashboardScreen');
        }} */
          >
            Seus Prompts
          </Button>
          <p>{''}</p>
          <Button
          /* onClick={() => {
          navigation.navigate('PromptForm');
        }} */
          >
            Criar Novo Prompt
          </Button>
          <p>{''}</p>
          <Button onClick={handleAddPrompt}>Add Prompt de Teste</Button>
          <p>{''}</p>
          <Button onClick={handleLogout}>Sign Out</Button>
          <p>{''}</p>
        </>
      )}
    </div>
  );
};
