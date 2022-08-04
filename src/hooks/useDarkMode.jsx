import { useEffect, useState } from "react"

export function useDarkMode(){
  const [isDark, setIsDark] = useState(localStorage.getItem('topic'))

  useEffect(() => {
    const className = "dark"
    if (isDark !== 'White') {
      window.document.body.classList.add(className)
    
      const element = document.getElementsByClassName('btn')
      for(var i in element){
        try{
            element[i].classList?element[i].classList.add(className):element[i].classList=className
        } catch{}
      }


      const paragraphs = document.querySelectorAll('p')
      for(var i in paragraphs){
        try{
            paragraphs[i].classList?paragraphs[i].classList.add(className):paragraphs[i].classList=className
        } catch{}
      }

    document.querySelectorAll('.topic > span')[0].classList = className
    document.querySelectorAll('.topic > select')[0].classList = className
    document.getElementsByClassName('text')[0].classList.add(className)
    document.getElementsByClassName('content')[0].classList.add(className)

    } else {
      window.document.body.classList.remove(className)

      const element = document.getElementsByClassName('btn')
      for(var i in element){
        try{
            element[i].classList?element[i].classList.remove(className):element[i].classList=''
        } catch{}
      }

      const paragraphs = document.querySelectorAll('p')
      for(var i in paragraphs){
        try{
            paragraphs[i].classList?paragraphs[i].classList.remove(className):paragraphs[i].classList=''
        } catch{}
      }
    document.getElementsByClassName('text')[0].classList.remove(className)
    document.getElementsByClassName('content')[0].classList.remove(className)
    document.querySelectorAll('.topic > span')[0].classList = ''
    document.querySelectorAll('.topic > select')[0].classList = ''

    }
  }, [isDark])

  return [isDark, setIsDark]
}