import { useEffect, useState } from "react"

export function useDarkModeMain(){
  const [isDark, setIsDark] = useState(localStorage.getItem('topic'))

  useEffect(() => {
    const className = "dark"
    if (isDark !== 'White') {
      // window.document.body.classList.add(className)
      document.querySelector('#header').classList.add(className);
      document.querySelector('.button').classList.add(className);
    }
     else {
      document.querySelector('#header').classList.remove(className);
      document.querySelector('.button').classList.remove(className);
      // window.document.body.classList.remove(className)
    }
  }, [isDark])

  return [isDark, setIsDark]
}