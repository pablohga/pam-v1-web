import React, { useState } from 'react';

/* import { PromptResultProps } from './interfaces/index'; */
import { styles } from './styles/index';
/* import * as Clipboard from 'expo-clipboard'; */
/* import Clipboard from '@react-native-clipboard/clipboard'; */
import jsPDF from 'jspdf';
/* import { shareAsync } from 'expo-sharing'; */
/* import uuid from 'react-native-uuid'; */
/* import { uuid } from 'uuidv4'; */
/* import AsyncStorage from '@react-native-async-storage/async-storage'; */
/* import Toast from 'react-native-toast-message'; */
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField/TextField';
import Modal from '@mui/material/Modal/Modal';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';

const PromptResult = ({ options }: any) => {
  /* const uuid = uuidv4; */
  const [showModal, setShowModal] = useState(false);
  const [textToCopy, setTextToCopy] = useState('');
  const [saveData, setSaveData] = useState({
    id: '',
    name: '',
    prompt: ''
  });

  /*  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(PromptCompleto);
  }; */

  /* const copyToClipboard = () => {
    Clipboard.setStringAsync(PromptCompleto);
  }; */

  const PromptCompleto =
    (options.angulo === 'Não selecionado' ? '' : options.angulo) +
    (options.iluminacao === 'Não selecionado' ? '' : options.iluminacao) +
    (options.cameraCena === 'Não selecionado' ? '' : options.cameraCena) +
    (options.objeto === '' ? '' : options.objeto + `, `) +
    (options.caractObjeto === '' ? '' : options.caractObjeto + `, `) +
    (options.acaoObjeto === '' ? '' : options.acaoObjeto + `, `) +
    (options.estilo1 === 'Não selecionado' ? '' : options.estilo1) +
    (options.estilo2 === 'Não selecionado' ? '' : options.estilo2) +
    (options.estilo3 === 'Não selecionado' ? '' : options.estilo3) +
    (options.estilo4 === 'Não selecionado' ? '' : options.estilo4) +
    (options.estilo5 === 'Não selecionado' ? '' : options.estilo5) +
    (options.estilo6 === 'Não selecionado' ? '' : options.estilo6) +
    (options.posprocessamento === 'Não selecionado'
      ? ''
      : options.posprocessamento);

  const html = `
    <html>
      <body>
        <h1>Prompt: <br/> 
          ${PromptCompleto}
        </h1>
        <p style="color: red;">
          Prompt made in PROMPT ART MAKER (PAM).
        </p>
      </body>
    </html>
  `;

  /*  await shareAsync(file.uri); */

  const generatePdf = () => {
    const pdf = new jsPDF();
    pdf.text(html, 10, 10); // Adiciona texto na posição (10, 10)
    pdf.save(`meu-prompt-${saveData.name}.pdf`); // Salva o PDF com o nome "meu-prompt-nome_do_arquivo.pdf"
  };
  async function handleSavePrompt() {
    try {
      const id =
        Math.random().toString(36).substring(2) + Date.now().toString(36);
      const newData = {
        id,
        name: saveData.name,
        prompt: saveData.prompt
      };
      const response = localStorage.getItem('@promptArtMaker:savePrompts');
      const previousData = response ? JSON.parse(response) : [];
      // const data = [...previousData, newData];

      console.log('newData: ', newData);
      console.log('previousData: ', previousData);

      localStorage.setItem(
        '@promptArtMaker:savePrompts',
        JSON.stringify([...previousData, newData])
      );
      <Alert variant="filled" severity="success">
        Prompt salvo com sucesso.
      </Alert>;

      setShowModal(false);
    } catch (error) {
      <Alert severity="error" color="info">
        Erro ao salvar.
      </Alert>;
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.containerView}>
        <p style={styles.titleSmall}>Prompt Gerado:</p>
        <p style={styles.title}>{PromptCompleto}</p>
      </div>
      <div style={styles.container}></div>
      <Button
        variant="outlined"
        onClick={() => {
          navigator.clipboard.writeText(textToCopy);
        }}
      >
        Copiar Prompt
      </Button>
      <Button variant="outlined" onClick={() => setShowModal(true)}>
        Salvar
      </Button>

      <Button variant="outlined" onClick={() => generatePdf()}>
        Salvar como PDF
      </Button>

      <Button onClick={() => setShowModal(true)}>Open modal</Button>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <TextField
            style={styles.input}
            value={saveData.name}
            onChange={(e) => setSaveData({ ...saveData, name: e.target.value })}
          />
          <Button onClick={handleSavePrompt}>Salvar</Button>
        </Box>
      </Modal>

      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Salvar Prompt</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Nome do Prompt:</FormControl.Label>
              <TextField
                style={styles.input}
                value={saveData.name}
                onChangep={(text) => setSaveData({ ...saveData, name: text })}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Prompt</FormControl.Label>
              
              <pArea
                autoCompleteType
                h={20}
                value={(saveData.prompt = PromptCompleto)}
                placeholder={PromptCompleto}
                w="100%"
                maxW="300"
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button colorScheme="purple" onPress={handleSavePrompt}>
                Salvar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
    </div>
  );
};

export default PromptResult;
