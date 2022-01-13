const output = document.querySelector('#output')
const checkbox = document.querySelector('#tac')

let todos = [];

const getjson = (url) => {
    fetch(url)
    .then((response) => response.json())
    .then((json) =>  {
        todos = json;
        console.log(json[9])
        
        output.innerHTML = ''
        todos.forEach(todo => {
            if(todo.id < 11) {
                output.innerHTML += `
                <div id="todon" class="person d-flex is-notdone">
                <div class="output">
                <div class="text-group">
                <p id="output-text">${todo.id}</p>
                <p id="output-text">${todo.title}</p>
                <p id="output-text">${todo.body}</p>
                </div>
                <div class="output-group d-flex">
                    <input type="checkbox" id="tac" class="tac-control">
                    <button id="resetbutton" class="btndelete">X</button>
                </div>
                </div>
                </div>
                `
            }

        })        
    })
}

getjson('https://jsonplaceholder.typicode.com/posts/');

