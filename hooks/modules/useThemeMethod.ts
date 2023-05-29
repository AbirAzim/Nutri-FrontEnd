import { useRef, useEffect } from "react";

interface ThemeMethods {
  toggleCollection?: (e: any) => any;
}
const useThemeMethod = (props?: ThemeMethods) => {
  // const { toggleCollection = () => {} } = props;
  const ref = useRef<any>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const btn = element.querySelector("#toggleCollection");
      if (btn) {
        btn.onclick = props?.toggleCollection;
      }
    }
  });

  return ref;
};

export default useThemeMethod;
