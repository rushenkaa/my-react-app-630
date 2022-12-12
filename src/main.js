document.querySelector('button').addEventListener('click', getFetch)
function getFetch(){
    const choice = document.querySelector('input').value
    console.log(choice)
    const url = `https://api.nasa.gov/planetary/apod?api_key=aG5AdhEqeSmwERedGPPweN2MmYZo7AwEB2EzgeSB&date=${choice}`
    fetch(url)
    .then(res => res.json()) //to parse data as json
    .then(data =>{
        console.log(data)
        document.querySelector('img').src = data.hdurl
        document.querySelector('h3').innerText = data.explanation
    })
    .catch(err =>{
        // eslint-disable-next-line
        console.log('error ${err}')
    });
    // eslint-disable-next-line
}
