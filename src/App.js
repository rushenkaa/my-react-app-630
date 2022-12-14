import './App.css';

document.querySelector('button').addEventListener('click', getFetch)
function getFetch(){
    const choice = document.querySelector('input').value
    console.log(choice)
    const url = `https://api.nasa.gov/planetary/apod?api_key=aG5AdhEqeSmwERedGPPweN2MmYZo7AwEB2EzgeSB&date=${choice}`
    console.log(url)
    fetch(url)
    .then(res => res.json()) //to parse data as json
    .then(data =>{
        console.log(data)
        if( data.media_type === 'image')
          {
            document.querySelector('img').src = data.hdurl
          }
      else if (data.media_type === 'video'){
        document.querySelector('iframe').src = data.url
      }
        document.querySelector('h3').innerText = data.explanation
    })
    .catch(err =>{
        console.log('error ${err}')
    });
}


function App() {
  return (
    
    <BrowserRouter>
      <div>
        <Route component={Home} path="/" exact/>
        <Route component={NasaPhoto} path="/nasaphoto" />
      </div>
    </BrowserRouter>
    
    
    /* <div className="App">
      <header className="App-header">
      </header>
    </div> /*
  );
}

export default App;
