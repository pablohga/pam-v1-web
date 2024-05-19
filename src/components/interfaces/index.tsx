export interface PromptOptions {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
  angulo: string;
  iluminacao: string;
  objeto: string;
  caractObjeto: string;
  acaoObjeto: string;
  cenario: string;
  resolucao: string;
  cameraCena: string;
  qualidade: string;
  posprocessamento: string;
  estilo1: string;
  estilo2: string;
  estilo3: string;
  estilo4: string;
  estilo5: string;
  estilo6: string;
}

export interface PromptResultProps {
  options: PromptOptions;
}
