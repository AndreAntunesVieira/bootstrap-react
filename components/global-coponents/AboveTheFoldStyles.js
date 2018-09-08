import React from 'react'

export default function AboveTheFoldStyles(){
  return (
    <style>{`
body{
  background-color: #f5f5f5;
  margin: 0;
  font-family: Arial, Serif;
}
a, a:visited{
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
h1, h2, h3, h4, h5, h6{
  margin: 0;
  font-weight: normal;
}
*{
  box-sizing: border-box;
}
  `}</style>
  )
}
