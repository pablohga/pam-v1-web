import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import promptsDados from '../assets/data/prompts.json';
import PromptResult from '../components/PromptResult';

import { PromptOptions } from '../components/interfaces/index';
import { styles } from '../components/styles/index';
import { Box, MenuItem, Select, TextField } from '@mui/material';

export const PromptForm: React.FC = () => {
  const [promptVisible, setPromptVisible] = useState(false);
  const [options, setOptions] = useState<PromptOptions>({
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: '',
    angulo: '',
    iluminacao: '',
    objeto: '',
    caractObjeto: '',
    acaoObjeto: '',
    cenario: '',
    posprocessamento: '',
    resolucao: '',
    cameraCena: '',
    qualidade: '',
    estilo1: '',
    estilo2: '',
    estilo3: '',
    estilo4: '',
    estilo5: '',
    estilo6: ''
  });

  const handleChangeText = (field: string, value: string) => {
    setOptions({
      ...options,
      [field]: value + `, `
    });
    console.log('iluminacao', options.iluminacao);
    console.log('angulo', options.angulo);
    console.log('options objeto:', options.objeto);
  };

  const handleSubmit = () => {
    setPromptVisible(true);
  };

  return (
    <Box style={{ marginTop: 20 }}>
      <Stack width="full">
        <div style={styles.container}>
          <div style={styles.containerView}>
            <div style={styles.titleSmall}>Angulo de Visão:</div>
            <Select
              value={options.angulo}
              /* onChange={(itemValue: any, itemIndex) =>
                handleChangeText('angulo', itemValue)
              } */
              onChange={(event) =>
                handleChangeText('angulo', event.target.value)
              }
              style={styles.picker}
            >
              {promptsDados.CommandForViews.map((item: string) => (
                <MenuItem key={item} value={item}>
                  {item}{' '}
                </MenuItem>
              ))}
            </Select>
            <div style={styles.titleSmall}>
              Selecionou: <div style={styles.selecionado}>{options.angulo}</div>
            </div>
          </div>
          <div style={styles.containerView}>
            <div style={styles.titleSmall}>Iluminação:</div>
            <Select
              value={options.iluminacao}
              onChange={(event) =>
                handleChangeText('iluminacao', event.target.value)
              }
              style={styles.picker}
            >
              {promptsDados.iluminacao.map((item: string) => (
                <MenuItem key={item} value={item}>
                  {item}{' '}
                </MenuItem>
              ))}
            </Select>

            <div style={styles.titleSmall}>
              Selecionou:
              <div style={styles.selecionado}> {options.iluminacao}</div>
            </div>
          </div>
          <div style={styles.containerView}>
            <div style={styles.titleSmall}>Tipo Camêra e Atmosfera:</div>
            <Select
              value={options.cameraCena}
              onChange={(event) =>
                handleChangeText('cameraCena', event.target.value)
              }
              style={styles.picker}
            >
              {promptsDados.cameraCena.map((item: string) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <div style={styles.titleSmall}>
              Selecionou:
              <div style={styles.selecionado}> {options.cameraCena}</div>
            </div>
          </div>
          <div style={styles.containerView}>
            <div style={styles.titleSmall}>
              Objeto Principal ( Qual será o objeto principal da sua arte? ):
            </div>
            <div>Ex: Um garoto negro, Um baú de tesouros, uma àrvore...</div>

            <TextField
              id="outlined-basic"
              /* style={styles.input} */
              placeholder="Um garoto negro"
              value={options.objeto}
              onChange={(event) =>
                setOptions({ ...options, objeto: event.target.value })
              }
            />
          </div>
          <div style={styles.containerView}>
            <div style={styles.titleSmall}>
              Caracteristicas do Objeto ( Quais a caracteristicas do objeto? ):
            </div>
            <div>
              Ex: cabelos curtos e olhos castanhos, várias moedas e pedras
              preciosas, está no topo da colina..
            </div>
            <TextField
              style={styles.input}
              placeholder="Cabelos curtos e olhos castanhos"
              value={options.caractObjeto}
              onChange={(event) =>
                setOptions({ ...options, caractObjeto: event.target.value })
              }
            />
          </div>
          <div style={styles.containerView}>
            <div style={styles.titleSmall}>
              Ação do Objeto ( O que ele está fazendo? ):
            </div>
            <div>
              Ex: brincando na rua, brilhando a luz do sol, balançando ao
              vento...
            </div>
            <TextField
              style={styles.input}
              placeholder="brincando na rua"
              value={options.acaoObjeto}
              onChange={(event) =>
                setOptions({ ...options, acaoObjeto: event.target.value })
              }
            />
          </div>
          <div style={styles.containerView}>
            <div style={styles.titleSmall}>
              Cenário: ( Como é o cenário aonde o objeto se encontra? ):
            </div>
            <div>
              Ex: rua com casa pequenas e baixas, uma caverna na praia, uma
              colina coberta por grama...
            </div>
            <TextField
              style={styles.input}
              placeholder="rua com casa pequenas e baixas"
              value={options.cenario}
              onChange={(event) =>
                setOptions({ ...options, cenario: event.target.value })
              }
            />
          </div>

          <div style={styles.title}>ESCOLHA O ESTILO DA SUA ARTE:</div>
          <div>
            Poderá escolher quantos estilos desejar, porém, para um melhor
            resultado selecione apenas 1 estilo.
          </div>

          <div style={styles.containerView}>
            <div>
              <div style={styles.titleSmall}>Anime:</div>
              <Select
                value={options.estilo1}
                onChange={(event) =>
                  handleChangeText('estilo1', event.target.value)
                }
                style={styles.picker}
              >
                {promptsDados.CommandForAnime.map((item: string) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <div style={styles.titleSmall}>
                Selecionou:
                <div style={styles.selecionado}> {options.estilo1}</div>
              </div>
            </div>
            <div>
              <div style={styles.titleSmall}>
                Filmes e Tv Shows (Startrek, Matrix, Simpsons...):
              </div>
              <Select
                value={options.estilo2}
                onChange={(event) =>
                  handleChangeText('estilo2', event.target.value)
                }
                style={styles.picker}
              >
                {promptsDados.CommandForTvShows.map((item: string) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <div style={styles.titleSmall}>
                Selecionou:
                <div style={styles.selecionado}> {options.estilo2}</div>
              </div>
            </div>
            <div>
              <div style={styles.titleSmall}>
                VFX e Empresas (Disney, Pixar, Marvel...):
              </div>
              <Select
                value={options.estilo3}
                onChange={(event) =>
                  handleChangeText('estilo3', event.target.value)
                }
                style={styles.picker}
              >
                {promptsDados.CommandForVFXAndVideoCompanies.map(
                  (item: string) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                )}
              </Select>
              <div style={styles.titleSmall}>
                Selecionou:
                <div style={styles.selecionado}> {options.estilo3}</div>
              </div>
            </div>

            <div>
              <div style={styles.titleSmall}>Realismo:</div>
              <Select
                value={options.estilo4}
                onChange={(event) =>
                  handleChangeText('estilo4', event.target.value)
                }
                style={styles.picker}
              >
                {promptsDados.CommandForRealism.map((item: string) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div style={styles.titleSmall}>
              Selecionou:
              <div style={styles.selecionado}> {options.estilo4}</div>
            </div>
            <div>
              <div style={styles.titleSmall}>Abstrato:</div>
              <Select
                value={options.estilo5}
                onChange={(event) =>
                  handleChangeText('estilo5', event.target.value)
                }
                style={styles.picker}
              >
                {promptsDados.CommandForAbstract.map((item: string) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <div style={styles.titleSmall}>
                Selecionou:
                <div style={styles.selecionado}> {options.estilo5}</div>
              </div>
            </div>
            <div>
              <div style={styles.titleSmall}>Miscelânea:</div>
              <Select
                value={options.estilo6}
                onChange={(event) =>
                  handleChangeText('estilo6', event.target.value)
                }
                style={styles.picker}
              >
                {promptsDados.CommandForMiscellaneous.map((item: string) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <div style={styles.titleSmall}>
                Selecionou:
                <div style={styles.selecionado}> {options.estilo6}</div>
              </div>
            </div>
          </div>

          <div style={styles.containerView}>
            <div style={styles.titleSmall}>Pos-Processamento:</div>
            <Select
              value={options.posprocessamento}
              onChange={(event) =>
                handleChangeText('posprocessamento', event.target.value)
              }
              style={styles.picker}
            >
              {promptsDados.posprocessamento.map((item: string) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <div style={styles.titleSmall}>
              Selecionou:
              <div style={styles.selecionado}> {options.posprocessamento}</div>
            </div>
          </div>
          <div style={{ marginTop: 10 }}></div>

          <Button onClick={handleSubmit} variant="contained">
            Gerar Prompt
          </Button>
          {promptVisible && <PromptResult options={options} />}
        </div>
      </Stack>
    </Box>
  );
};
