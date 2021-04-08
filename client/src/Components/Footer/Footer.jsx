import React from 'react'
import Style from './footer.module.css'


export function Footer() {
    return (
        <div className={Style.Div}>
        <div className={Style.Div2}>
        <h1 >Sign up to ours NewsLetter</h1>
        <input  className={Style.Input} placeholder='Email..'/>
        <button className={Style.Input}>Suscribe</button>
        </div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
            <div>
              <h1>Information</h1>
            </div>
            <div>
                <h1>PC parts</h1>
            </div>
            <div>
                <h1>Desktop PC</h1>
            </div>
            <div>
                <h1>Laptops</h1>
            </div>
          </div>
        </div>
    )
}