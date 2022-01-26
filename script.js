const form = document.querySelector('#Form')
const title = document.querySelector('#title')
const output = document.querySelector('.outputs')
const invalid = document.querySelector('.invalid-feedback')

let todos = [];

const getjson = () => {
fetch('https://jsonplaceholder.typicode.com/todos/')
    .then((response) => response.json())
    .then((json) =>  {
        todos = json.splice(0, 10);
        listTodos();
    })
}

getjson();

const listTodos = () => {
    output.innerHTML = ''
    todos.forEach(todo => {
                output.innerHTML += `
                <div id="${todo.id}" class="todon person d-flex">
                    <div class="output">
                        <label class="for-tac">
                            <input type="checkbox" class="tac-control">
                            <span class="checkmark"></span>
                        </label>
                        <div class="text-group">
                            <p id="output-text">${todo.title}</p>
                        </div>
                        <button type="button" class="btndelete">X</button>
                    </div>
                </div>
                `
    }) 
    
}

const validateText = (id) => {
    let input = document.querySelector(id)

    if(input.value === '' || input.value.length < 2) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid')
        invalid.classList.add('d-block')
        input.focus();
        return false;
    }
    else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        invalid.classList.remove('d-block')
        return true;
    }
}


form.addEventListener('submit', e => {
    e.preventDefault();

    const errors = [];

    for (let i = 0; i< e.currentTarget.length; i++) {
        if (e.currentTarget[i].type === 'text') {
            errors[i] = validateText('#' + e.currentTarget[i].id)
            // console.log(i)
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
            todos.forEach(todo => {
                todo.id++;
            })
            todos.unshift(json)
            title.value = ''
            // console.log(todos)
            listTodos();

        })
    }   
})

const deletetodo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE',
    })
    .then((res) => {
        if(res.status !== 200) {
            return
        }       
    })
}

output.addEventListener('click', e => {
    if(e.target.type == 'button') {   
        deletetodo(e.target.parentNode.parentNode.id);        
        todos = todos.filter(todo => todo.id != e.target.parentNode.parentNode.id)
        console.log(todos);
        listTodos();
    }
    else if (e.target.type = 'checkbox') {
        let btndelete = e.target.parentNode.parentNode.querySelector(".btndelete");

        if(e.target.checked) {
            e.target.parentNode.parentNode.parentNode.classList.add('bord');
            btndelete.classList.add("d-block")
            
        }
        else {
            e.target.parentNode.parentNode.parentNode.classList.remove('bord')
            btndelete.classList.remove("d-block")
        }
    }
})


