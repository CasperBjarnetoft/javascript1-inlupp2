const form = document.querySelector('#Form')
const headline = document.querySelector('#headline')
const about = document.querySelector('#about')
const output = document.querySelector('#output')
let tac = document.querySelector('#tac')

let todos = [];
let number = 1;

const getjson = (url) => {
    fetch(url)
    .then((response) => response.json())
    .then((json) =>  {
        todos = json;
    
        console.log(json)
        output.innerHTML = ''
        todos.forEach(todo => {
                output.innerHTML += `
                <div id="todon" class="person d-flex is-notdone">
                <div class="output">
                <input type="checkbox" id="tac" class="tac-control">
                <div class="text-group">
                <p id="output-text">${number}</p>
                <p id="output-text">${todo.title}</p>
                <p id="output-text">${todo.body}</p>
                </div>
                <button type="button" id="resetbutton" class="btndelete">X</button>
                </div>
                </div>
                `
                number++;
        })        
    })
    
}

getjson('https://jsonplaceholder.typicode.com/posts?userId=1');

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
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: headline.value,
                body: about.value,
                useriId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => response.json())
        .then((json) => {
            todos.push(json)
            headline.value = ''
            about.value = ''
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
                    <p id="output-text">${todo.body}</p>
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




