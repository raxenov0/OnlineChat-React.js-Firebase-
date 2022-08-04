import { useEffect, useState } from "react"

export function useDarkModeSign(){
  const [isDark, setIsDark] = useState(localStorage.getItem('topic'))

  useEffect(() => {
    const className = "dark"
    if (isDark !== 'White') {
      window.document.body.classList.add(className)
      document.querySelector('.container > .screen').classList.add(className);
      document.querySelector('.screen__background__shape4').classList.add(className);
      document.querySelector('.screen__background__shape3').classList.add(className);
      document.querySelector('.screen__background__shape2').classList.add(className);
      document.querySelector('.screen__background__shape1').classList.add(className);
      document.querySelector('.login__submit').classList.add(className);
    }
     else {
      window.document.body.classList.remove(className)
      document.querySelector('.container > .screen').classList.remove(className);
      document.querySelector('.screen__background__shape4').classList.remove(className);
      document.querySelector('.screen__background__shape3').classList.remove(className);
      document.querySelector('.screen__background__shape2').classList.remove(className);
      document.querySelector('.screen__background__shape1').classList.remove(className);
      document.querySelector('.login__submit').classList.remove(className);
    }
  }, [isDark])

  return [isDark, setIsDark]
}