let activateEmail = (userName,id) => {
    return id?`<html lang="en">
    <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>TechStore</title>
    </head>
    <body style=" font-family: 'Open Sans', 'Arial Narrow', Arial, sans-serif; ">
        <div
            style="height: 100%; padding: 2em; background-image: url('https://static.vecteezy.com/system/resources/previews/000/245/854/original/banana-leaf-background-vector.jpg%27'); background-size: 100%;">
            <div style="border-radius: 2em;text-align: -webkit-center;background-color: #9abf15;z-index: 1;position: relative;">
                <img src="https://res.cloudinary.com/techstore/image/upload/v1618082875/edobvt8ghwyblnagtkoj.png" style="width:100px"   />
                <h1 style="color: #000000;margin: .2em; font-size: 2em; font-weight: 100;">Tech Store</h1>
                <p style="color: #ffffff;font-weight: 800;font-size:3rem;background-color: #507b00;margin-bottom: 0;padding:1em;">
                    El usuario ${userName} quiere recuperar su cuenta! </p>
                <a href='http://localhost:3000/activedUser/${id}'>Activar usuario</a>
                <p> Thanks for choosing us!</p>
                <p> Tech Store Team </p>
            </div>
        </div>

    </body>
</html>`
:`<html lang="en">
    <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>TechStore</title>
    </head>
    <body style=" font-family: 'Open Sans', 'Arial Narrow', Arial, sans-serif; ">
        <div
            style="height: 100%; padding: 2em; background-image: url('https://static.vecteezy.com/system/resources/previews/000/245/854/original/banana-leaf-background-vector.jpg%27'); background-size: 100%;">
            <div style="border-radius: 2em;text-align: -webkit-center;background-color: #9abf15;z-index: 1;position: relative;">
                <img src="https://res.cloudinary.com/techstore/image/upload/v1618082875/edobvt8ghwyblnagtkoj.png" style="width:100px"  />
                <h1 style="color: #000000;margin: .2em; font-size: 2em; font-weight: 100;">Tech Store</h1>
                <p style="color: #ffffff;font-weight: 800;font-size:3rem;background-color: #507b00;margin-bottom: 0;padding:1em;">
                    El usuario ${userName} ha desactivado su cuenta! </p>
                <p> Thanks for choosing us!</p>
                <p> Tech Store Team </p>
            </div>
        </div>

    </body>
</html>`
}

module.exports = {
    activateEmail
}