const form = document.querySelector('#Form')
const title = document.querySelector('#title')
const output = document.querySelector('#output')

let todos = [];
let number = 1;

const getjson = (url) => {
    fetch(url)
    .then((response) => response.json())
    .then((json) =>  {
        todos = json.splice(0, 10);
    
        output.innerHTML = ''
        todos.forEach(todo => {
                    output.innerHTML += `
                    <div id="todon" class="person d-flex is-notdone">
                    <div class="output">
                    <input type="checkbox" id="tac" class="tac-control">
                    <div class="text-group">
                    <p id="output-text">${number}</p>
                    <p id="output-text">${todo.title}</p>
                    </div>
                    <button type="button" id="resetbutton" class="btndelete">X</button>
                    </div>
                    </div>
                    `
                    number++;
        }) 
        console.log(todos)       
    })
    
}

getjson('https://jsonplaceholder.typicode.com/todos/');

const validateText = (id) => {
    let input = document.querySelector(id)

    if(input.value === '' || input.value.length < 2) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid')
        input.focus();
        return false;
    }
    else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
}


form.addEventListener('submit', e => {
    e.preventDefault();

    const errors = [];

    for (let i = 0; i< e.currentTarget.length; i++) {
        if (e.currentTarget[i].type === 'text') {
            errors[i] = validateText('#' + e.currentTarget[i].id)
            console.log(i)
        }
    }


    if(errors.includes(false)) {

    }
    else {
        fetch('https://jsonplaceholder.typicode.com/todos/', {
            method: 'POST',
            body: JSON.stringify({
                title: title.value,
                useriId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => response.json())
        .then((json) => {
            todos.unshift(json)
            title.value = ''
            console.log(todos)

            let numbers = 1;
            output.innerHTML = ''
            todos.forEach(todo => {
                    output.innerHTML += `
                    <div id="todon" class="person d-flex is-notdone">
                    <div class="output">
                    <input type="checkbox" id="tac" class="tac-control">
                    <div class="text-group">
                    <p id="output-text">${numbers}</p>
                    <p id="output-text">${todo.title}</p>
                    </div>
                    <button type="button" id="resetbutton" class="btndelete">X</button>
                    </div>
                    </div>
                    `
                    todo.id++;
                    numbers++;
                })
            })
    }    
})




