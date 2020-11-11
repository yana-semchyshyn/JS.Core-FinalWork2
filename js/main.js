// Variable of text block to add text styles
let textBox = document.querySelector('.text_box');
// Variable of text subblock to add line-through style
let text = document.querySelector('.text');

// This function acts like toggle function, namely it adds a certain style to the element if it doesn't have such one and removes style if it has one
function toggleTextStyle(elem, textElem, property, value) {
    elem.addEventListener('click', () => textElem.style[`${property}`] == `${value}` ? textElem.style[`${property}`] = '' : textElem.style[`${property}`] = `${value}`);
}

toggleTextStyle(document.querySelector('.bold'), textBox, 'font-weight', 'bold');
toggleTextStyle(document.querySelector('.italic'), textBox, 'font-style', 'italic');
toggleTextStyle(document.querySelector('.underline'), textBox, 'text-decoration', 'underline');
toggleTextStyle(document.querySelector('.crossed'), text, 'text-decoration', 'line-through');

// This function set a certain style to the element
setTextStyle = (elem, property, value) => elem.addEventListener('click', () => text.style[`${property}`] = `${value}`);

setTextStyle(document.querySelector('.left'), 'text-align', 'left');
setTextStyle(document.querySelector('.center'), 'text-align', 'center');
setTextStyle(document.querySelector('.right'), 'text-align', 'right');

// This function set a certain style to the element, by means of drop-down menus
function selectTextStyle(elem, property) {
    document.querySelectorAll(`.${elem}`).forEach(element => element.addEventListener('click', () => textBox.style[`${property}`] = element.textContent));
}

selectTextStyle('fontFamily', 'font-family');
selectTextStyle('fontSize', 'font-size');

// Array of colors for the text and background
let colors = ['rgb(10, 169, 153)', 'rgb(8, 144, 131)', 'rgb(31, 182, 108)', 'rgb(27, 155, 94)', 'rgb(40, 145, 221)', 'rgb(32, 122, 185)', 'rgb(155, 100, 181)',
    'rgb(144, 81, 173)', 'rgb(49, 72, 94)', 'rgb(40, 61, 79)', 'rgb(245, 189, 6)', 'rgb(248, 155, 10)', 'rgb(237, 130, 27)', 'rgb(219, 92, 0)', 'rgb(242, 90, 57)',
    'rgb(200, 69, 37)', 'rgb(234, 238, 240)', 'rgb(187, 193, 196)', 'rgb(144, 162, 163)', 'rgb(124, 138, 139)', 'rgb(0, 0, 0)'];

// Array of images for background
let images = ['evening.jpg', 'building.jpg', 'bridge.jpg', 'sunrise.jpg', 'field.jpg', 'elephant.jpg', 'mountains.jpg', 'iceland.jpg', 'art.jpg',];

// This function temporary hides elements
function hideElem(selector) {
    if (selector.classList.contains('add')) {
        selector.classList.remove('add');
        selector.classList.add('remove');
    }
}

// This function temporary shows elements
function showElem(selector) {
    if (selector.classList.contains('remove')) {
        selector.classList.remove('remove');
        selector.classList.add('add');
    }
}

// This function creates box with text colors or background colors or background images
function createClrImgBox(selector1, selector2, array) {
    for (let i = 0; i < array.length; i++) {
        let div = document.createElement('div');
        selector2.append(div);
        if (selector1 == 'colorBox' || selector1 == 'bgColorBox') {
            div.classList.add(`${selector1}`, 'add');
            div.style.backgroundColor = array[i];
        }
        else if (selector1 == 'bgImageBox') {
            div.classList.add(`${selector1}`, 'remove');
            div.style.backgroundImage = `url(./images/${array[i]})`;
        }
    }
    document.querySelectorAll(`.${selector1}`).forEach(element => {
        element.addEventListener('click', function () {
            if (selector2 == document.querySelector('.modal-body')) textBox.style.color = element.style.backgroundColor;
            if (selector2 == document.querySelector('#colors')) {
                textBox.style.backgroundImage = '';
                textBox.style.backgroundColor = element.style.backgroundColor;
            }
            if (selector2 == document.querySelector('#images')) {
                textBox.style.backgroundColor = '';
                textBox.style.backgroundImage = element.style.backgroundImage;
            }
        })
    });
}

createClrImgBox('colorBox', document.querySelector('.modal-body'), colors);
createClrImgBox('bgColorBox', document.querySelector('#colors'), colors);
createClrImgBox('bgImageBox', document.querySelector('#images'), images);

document.querySelector('#colors-tab').addEventListener('click', function () {
    document.querySelectorAll('.bgColorBox').forEach(element => {
        showElem(element);
    });
    document.querySelectorAll('.bgImageBox').forEach(element => {
        hideElem(element);
    });
})

document.querySelector('#images-tab').addEventListener('click', function () {
    document.querySelectorAll('.bgImageBox').forEach(element => {
        showElem(element);
    });
    document.querySelectorAll('.bgColorBox').forEach(element => {
        hideElem(element);
    });
})

document.querySelector('#files-tab').addEventListener('click', function () {
    document.querySelectorAll('.bgColorBox').forEach(element => {
        hideElem(element);
    });
    document.querySelectorAll('.bgImageBox').forEach(element => {
        hideElem(element);
    });
})

document.querySelector('#inputGroupFile').addEventListener('change', function (event) {
    let urlImage = URL.createObjectURL(event.target.files[0]);
    textBox.style.backgroundColor = '';
    textBox.style.backgroundImage = `url(${urlImage})`;
})

// This function check if the value of input is valid
function checkInputVal(input, RegExp) {
    if (!RegExp.test(input.value)) {
        input.classList.add('is-invalid');
        count++;
    }
    else input.classList.remove('is-invalid');
}

// This function check if the value of select is valid
checkSelectVal = (select) => select.options[0].selected ? select.classList.add('is-invalid') : select.classList.remove('is-invalid');

// This function resets all styles and value of the fields of certain form
function resetForms(formName, inputs) {
    formName.reset();
    inputs.forEach(element => element.classList.remove('is-invalid'));
}

// This function shows feedbacks if the values of the fields of the form is invalid
function showInvFeedback(invFeedbackElem, message) {
    invFeedbackElem.textContent = message;
    invFeedbackElem.style.display = 'flex';
}

// This function hides feedbacks if the values of the fields of the form is valid
function deleteInvFeedback(invFeedbackElem) {
    invFeedbackElem.textContent = '';
    invFeedbackElem.style.display = 'none';
}

// Regular expression for login
let loginRegExp = /^admin$/;
// Regular expression for password
let passwordRegExp = /^myPersonalProfile11$/;
// Login field of modal window of signing in
let login = document.querySelector('.login');
// Password field of modal window of signing in
let password = document.querySelector('.password');
// Edit button
let edit = document.querySelector('.edit');
// Form of Sign In
let signInForm = document.forms.signIn;
// Count variable to count if all the inputs are valid
let count = 0;

document.querySelector('.sign_in_button').addEventListener('click', function () {
    if ((signInForm[0].value == '' && signInForm[1].value == '') || (signInForm[0].value == '' || signInForm[1].value == '')) {
        signInForm[0].classList.add('is-invalid');
        signInForm[1].classList.add('is-invalid');
        showInvFeedback(document.querySelector('.sgnInvFdbck'), 'Value is empty');
    }
    else if ((!loginRegExp.test(signInForm[0].value) && !passwordRegExp.test(signInForm[1].value)) || (!loginRegExp.test(signInForm[0].value) || !passwordRegExp.test(signInForm[1].value))) {
        signInForm[0].classList.add('is-invalid');
        signInForm[1].classList.add('is-invalid');
        showInvFeedback(document.querySelector('.sgnInvFdbck'), 'Please check your login or password');
    }
    else if (loginRegExp.test(signInForm[0].value) && passwordRegExp.test(signInForm[1].value)) {
        edit.disabled = false;
        edit.classList.remove('disabled');
        $('#ModalSignIn').modal('hide');
        document.querySelector('.sign-In-Out').setAttribute('data-target', '#ModalSignOut');
        document.querySelector('.signIcon').setAttribute('src', './images/unlock-alt-icon_1.svg')
        deleteInvFeedback(document.querySelector('.sgnInvFdbck'));
        resetForms(signInForm, document.querySelectorAll('.sign_tool'));
    }
});

document.querySelector('.btn_sign_out').addEventListener('click', () => {
    edit.disabled = true;
    edit.classList.add('disabled');
    document.querySelector('.signIcon').setAttribute('src', './images/lock-icon_2.svg');
    document.querySelector('.sign-In-Out').setAttribute('data-target', '#ModalSignIn');
})

// Variable of textarea to push created elements into it 
let textArea = document.querySelector('textarea');

edit.addEventListener('click', function () {
    hideElem(document.querySelector('.instr_panel'));
    hideElem(document.querySelector('.text_box'));
    showElem(document.querySelector('.addElementsBox'));
    showElem(document.querySelector('.editCode'));
    textArea.textContent = text.innerHTML;
})

document.querySelector('.save').addEventListener('click', function () {
    hideElem(document.querySelector('.addElementsBox'));
    hideElem(document.querySelector('.editCode'));
    showElem(document.querySelector('.instr_panel'));
    showElem(document.querySelector('.text_box'));
    text.innerHTML = textArea.value;
})

// Variables of table
let borderColor = document.querySelector('.borderColor');
let borderType = document.querySelector('.borderType');
let tableWidth = document.querySelector('.tableWidth');
let tableHeight = document.querySelector('.tableHeight');
let borderWidth = document.querySelector('.borderWidth');

// This function writes down HTML code of created table into textarea 
function tableCreate(row, col) {
    let borderStyle;
    let color;
    textArea.value += `<div>`;
    textArea.value += `<table style=\"border-collapse: collapse;\">`;
    textArea.value += `<tbody>`;
    for (let a = 0; a < borderType.options.length; a++) {
        if (borderType.options[a].selected) borderStyle = borderType.options[a].value;
    }
    for (let b = 0; b < borderColor.options.length; b++) {
        if (borderColor.options[b].selected) color = borderColor.options[b].value;
    }
    for (let j = 1; j <= row; j++) {
        textArea.value += '<tr>';
        for (let i = 1; i <= col; i++) {
            textArea.value += `<td style=\"width:${tableWidth.value}px; height:${tableHeight.value}px; border:${borderWidth.value}px ${borderStyle} ${color}\">TD</td>`;
        }
    }
    textArea.value += `</div>`;
    textArea.value += `</tbody>`;
    textArea.value += '</table>';
}

// Regular expression for numeric inputs
let regExp = /^\d{1,}$/;
let tableInputs = document.querySelectorAll('.table_input');
let tableTools = document.querySelectorAll('.table_tool')

document.querySelector('.createTableButton').addEventListener('click', function () {
    tableInputs.forEach(element => {
        checkInputVal(element, regExp);
    })
    checkSelectVal(borderType);
    checkSelectVal(borderColor);
    if ((count > 0 || borderType.options[0].selected || borderColor.options[0].selected) || (count < 0 && borderType.options[0].selected && borderColor.options[0].selected)) {
        showInvFeedback(document.querySelector('.tbl'), 'invalid value');
        count = 0;
        return false;
    }
    if (count == 0 && borderType.options[0].selected == false && borderColor.options[0].selected == false) {
        tableCreate(document.querySelector('.create_tr').value, document.querySelector('.create_td').value);
        deleteInvFeedback(document.querySelector('.tbl'));
    }
})

document.querySelector('.resetTableTools').addEventListener('click', () => {
    resetForms(document.forms.createTableTools, tableTools);
    deleteInvFeedback(document.querySelector('.tbl'));
});

// This function writes down HTML code of created list into textarea 
function listCreate(numOfli, typeOfList, styleOflist) {
    let listStyle;
    for (let a = 0; a < styleOflist.options.length; a++) {
        if (styleOflist.options[a].selected) listStyle = styleOflist.options[a].value;
    }
    textArea.value += `<${typeOfList} type= \"${listStyle}\" style='list-style-position: inside'>`;
    for (let j = 1; j <= numOfli; j++) {
        textArea.value += `<li>item ${j}</li>`;
    }
    textArea.value += `</${typeOfList}>`;
}

// Variables for ordered list
let orderedListBox = document.querySelector('.createOl');
let orderedList = document.querySelector('.count_ol_li');
let typeOfOlMarks = document.querySelector('.typeOfOlMarks');
let olInvFeedback = document.querySelector('.olLst');

// Variables for unordered list
let unorderedListBox = document.querySelector('.createUl');
let unorderedList = document.querySelector('.count_ul_li');
let typeOfUlMarks = document.querySelector('.typeOfUlMarks');
let ulInvFeedback = document.querySelector('.ulLst');

orderedListBox.addEventListener('click', function () {
    checkInputVal(orderedList, regExp);
    checkSelectVal(typeOfOlMarks, olInvFeedback, 'invalid value');
    if ((count > 0 || typeOfOlMarks.options[0].selected) || (count > 0 && typeOfOlMarks.options[0].selected)) {
        showInvFeedback(olInvFeedback, 'invalid value')
        count = 0;
        return false;
    }
    if (count == 0 && typeOfOlMarks.options[0].selected == false) {
        listCreate(orderedList.value, `ol`, typeOfOlMarks);
        deleteInvFeedback(olInvFeedback);
    }
})

document.querySelector('.resetOlTools').addEventListener('click', () => {
    resetForms(document.forms.createOlTools, document.querySelectorAll('.ol_tools'));
    deleteInvFeedback(olInvFeedback);
})

unorderedListBox.addEventListener('click', function () {
    checkInputVal(unorderedList, regExp);
    checkSelectVal(typeOfUlMarks, ulInvFeedback, 'invalid value');
    if ((count > 0 || typeOfUlMarks.options[0].selected) || (count > 0 && typeOfUlMarks.options[0].selected)) {
        showInvFeedback(ulInvFeedback, 'invalid value')
        count = 0;
        return false;
    }
    if (count == 0 && typeOfUlMarks.options[0].selected == false) {
        listCreate(unorderedList.value, `ul`, typeOfUlMarks);
        deleteInvFeedback(ulInvFeedback);
    }
})

document.querySelector('.resetUlTools').addEventListener('click', () => {
    resetForms(document.forms.createUlTools, document.querySelectorAll('.ul_tools'))
    deleteInvFeedback(ulInvFeedback);
});