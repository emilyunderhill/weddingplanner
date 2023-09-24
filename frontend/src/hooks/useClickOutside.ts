import { RefObject, useEffect, useState } from "react";

const useClickOutside = (ref: RefObject<HTMLDivElement>) => {
  const [isOutside, setIsOutside] = useState(false)


  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      setIsOutside(true);
    }
    else {
      setIsOutside(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [ref]);

  return isOutside
}

export default useClickOutside
