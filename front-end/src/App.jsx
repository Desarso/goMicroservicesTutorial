import { createSignal} from 'solid-js'
import { For } from "solid-js";


function App() {
  const [output, setOutput] = createSignal(["Output shows here..."]);
  const [sent, setSent] = createSignal();
  const [received, setReceived] = createSignal();


  function handleClick() {
    const body = {
      method: 'POST',
    }
    fetch("http:\/\/localhost:8080", body)
    .then((response) => response.json())
    .then((data) => {
        setSent(("empty post request"));
        setReceived(JSON.stringify(data, undefined, 4));
        if(data.error) {
            console.log(data.message);
        } else if(output()[0] === "Output shows here..."){
            setOutput([(<><br/><strong>Response from broker service</strong>: {data.message}</>)]);
        }else{
          setOutput([...output(),(<><br/><strong>Response from broker service</strong>: {data.message}</>) ]);
        }

    })
    .catch((error) => {
      let out = output()
        setOutput(out += "<br><br>Error: " + error);
    })
  }


  return (
    <>
      <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="mt-5">Test microservices</h1>
                <hr/>
                <a id="brokerBtn" class="btn btn-outline-secondary" href="javascript:void(0);" onClick={handleClick}>Test Broker</a>
                <div id="output" class="mt-5" style="outline: 1px solid silver; padding: 2em;">
                  <For each={output()}>
                    {(item) => {item}}
                  </For>
                     {output()}
                    {/* <span class="text-muted"></span> */}
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h4 class="mt-5">Sent</h4>
                <div class="mt-1" style="outline: 1px solid silver; padding: 2em;">
                    <pre id="payload"><span class="text-muted" placeholder='Nothing sent yet'>{sent()}</span></pre>
                </div>
            </div>
            <div class="col">
                <h4 class="mt-5">Received</h4>
                <div class="mt-1" style="outline: 1px solid silver; padding: 2em;">
                    <pre id="received"><span class="text-muted" placeholder='Nothing received yet...'>{received()}</span></pre>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col text-center">
                <hr/>
                <small class="text-muted">Copyright &copy; GoCode.ca</small>
            </div>
        </div>
    </div>
    </>
  );
}

export default App;



