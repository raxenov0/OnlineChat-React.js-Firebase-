import { useEffect, useState } from "react"

export function useDarkModeMessage(){
  const [isDark, setIsDark] = useState(localStorage.getItem('topic'))

  useEffect(() => {
    const className = "dark"
    if (isDark && isDark !== 'White') {
      // window.document.body.classList.add(className)
      document.querySelector('main').classList.add(className);
    }
     else if( isDark ){
      document.querySelector('main').classList.remove(className);
      // window.document.body.classList.remove(className)
    }
  }, [isDark])

  return [isDark, setIsDark]
}