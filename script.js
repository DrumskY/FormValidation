const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const popup = document.querySelector('.popup')


const showError = (input, msg) => {
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text')

    formBox.classList.add('error')
    errorMsg.textContent = msg;
}

const clearError = (input) => {
    const formBox = input.parentElement;
    formBox.classList.remove('error')
}

const checkForm = (input) => {
    input.forEach(element => {
        if (element.value === '') {
            showError(element, element.placeholder)
        }
        else {
            clearError(element)
        }
    })
}

const checkLenght = (input, min) => {
    if (input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min. ${min} znaków.`)
    }
}

const checkPassword = (passOne, passTwo) => {
    if (passOne.value !== passTwo.value) {
        showError(passTwo, 'hasła do siebie nie pasują')
    }
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value)) {
        clearError(email)
    }
    else {
        showError(email, 'E-mail jest niepoprawny')
    }
};

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.form-box');
    console.log(allInputs)
    let errorCount = 0
    allInputs.forEach(el => {
        if(el.classList.contains('error')){
            errorCount++
        }
    });
    console.log(errorCount)
    if(errorCount === 0){
        popup.classList.add('show-popup')
    }
}

sendBtn.addEventListener('click', (e) => {
    e.preventDefault();

    checkForm([username, pass, pass2, email])
    checkLenght(username, 3)
    checkLenght(pass, 8)
    checkPassword(pass, pass2)
    validateEmail(email)
    checkErrors()
})

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();

    [username, pass, pass2, email].forEach(element => {
        element.value = '';
        clearError(element)
    });
})