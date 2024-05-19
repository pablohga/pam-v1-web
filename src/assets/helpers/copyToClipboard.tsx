export const copyToClipboard = (text: any) => {
  if (!navigator.clipboard) {
    console.log('texto copiado!');
    return;
  }

  return navigator.clipboard.writeText(text).catch(() => {
    console.log('texto copiado!');
    console.error('Navigator clipboard: Could not copy text');
  });
};
