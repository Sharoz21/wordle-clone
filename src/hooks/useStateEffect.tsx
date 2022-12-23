import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";

function useStateEffect<Type>(
  defaultValue: Type
): [Type, Dispatch<SetStateAction<Type>>, MutableRefObject<Type>] {
  const [state, setState] = useState<Type>(defaultValue);
  const ref = useRef<Type>(defaultValue);
  ref.current = state;

  return [state, setState, ref];
}

export default useStateEffect;
