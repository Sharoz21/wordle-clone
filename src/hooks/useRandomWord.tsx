import { useEffect } from "react";
import useStateEffect from "./useStateEffect";

const useRandomWord = (): React.MutableRefObject<string> => {
  const [word, setWord, wordRef] = useStateEffect("");

  const fetchWord = async () => {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?length=5`
    );
    const data = await response.json();
    return data[0];
  };

  useEffect(() => {
    fetchWord().then((word) => {
      setWord(word);
    });
  }, []);

  return wordRef;
};

export default useRandomWord;
