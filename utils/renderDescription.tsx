// @ts-nocheck

export const renderDescription = (text: string, hyperlinks: { hyper_link_word: string; hyper_link_word_url: string; }[]) => {
    const linkWords: Record<string, string> = hyperlinks.reduce((acc, link) => {
      acc[link.hyper_link_word] = link.hyper_link_word_url;
      return acc;
    }, {});
  
    const words = text.split(' ');
    return words.map((word, i) => {
      const cleanedWord = word.replace(/[.,]/g, '');
      if (linkWords[cleanedWord]) {
        return (
          <a key={i} href={linkWords[cleanedWord]}>{cleanedWord}</a>
        );
      }
      return word + ' ';
    });
  };
  