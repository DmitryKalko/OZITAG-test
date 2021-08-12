//LAYOUT

//first block
const customerTendersBlock = document.createElement('div');
customerTendersBlock.classList.add('customerTendersBlock');

const titleShowBlock = document.createElement('div');
titleShowBlock.classList.add('titleShowBlock');

const customerTendersTitle = document.createElement('h4');
customerTendersTitle.textContent = 'Тендеры в роли Заказчика';

const showSelectedButton = document.createElement('p');
showSelectedButton.classList.add('showSelectedButton');
showSelectedButton.textContent = 'Показать выбранное (0)';

const firstSelect = document.createElement('input');
firstSelect.classList.add('firstSelect');
firstSelect.setAttribute('placeholder', 'Выберете товары');

//checkboxes container
const firstCheckBlock = document.createElement('div');
firstCheckBlock.classList.add('firstCheckBlock');

titleShowBlock.append(customerTendersTitle, showSelectedButton);
customerTendersBlock.append(titleShowBlock, firstSelect, firstCheckBlock);
document.body.append(customerTendersBlock);


// second block
const supplierTendersBlock = document.createElement('div');
supplierTendersBlock.classList.add('supplierTendersBlock');

const titleShowBlock2 = document.createElement('div');
titleShowBlock2.classList.add('titleShowBlock2');

const supplierTendersTitle = document.createElement('h4');
supplierTendersTitle.textContent = 'Тендеры в роли Поставщика';

const secondSelect = document.createElement('input');
secondSelect.classList.add('secondSelect');
secondSelect.setAttribute('placeholder', 'Выберете товары');

titleShowBlock2.append(supplierTendersTitle);
supplierTendersBlock.append(titleShowBlock2, secondSelect);
document.body.append(supplierTendersBlock);


//top block
const topBlock = document.createElement('div');
topBlock.classList.add('topBlock');

const topBlockNav = document.createElement('div');
topBlockNav.classList.add('topBlockNav');

const arrow = document.createElement('p');
arrow.classList.add('arrow');
arrow.textContent = '←';

const goods = document.createElement('h4');
goods.classList.add('goods');
goods.textContent = 'Реализуемые товары';

const chosen = document.createElement('p');
chosen.classList.add('chosen');
chosen.textContent = 'Выбранное (0)';

const inputTop = document.createElement('input');
inputTop.classList.add('inputTop');
inputTop.setAttribute('placeholder', 'Поиск по товарам');

topBlockNav.append(arrow, goods, chosen);
topBlock.append(topBlockNav, inputTop);
firstCheckBlock.append(topBlock);


const options = Array.from(document.getElementsByTagName('option'));

const optionsText = options.map(item => item.label);

for (let counter = 0; counter < optionsText.length; counter++) {
    const label = document.createElement('label');
    label.setAttribute('id', `${counter}`);
    label.textContent = `${optionsText[counter]}`;

    const input = document.createElement('input');
    input.classList.add('checkbox');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('value', `${optionsText[counter]}`);
    input.setAttribute('id', `${counter}`);

    label.append(input);
    firstCheckBlock.append(label);
};


// footer block
const footerBlock = document.createElement('div');
footerBlock.classList.add('footerBlock');

const applyButton = document.createElement('button');
applyButton.classList.add('applyButton');
applyButton.textContent = 'ПРИМЕНИТЬ';

const clear = document.createElement('p');
clear.classList.add('clear');
clear.textContent = 'Очистить';

footerBlock.append(applyButton, clear);
firstCheckBlock.append(footerBlock);


//FUNCTIONAL
const preCheckedIndexes = [];
options.forEach(option => {
    if (option.attributes.selected) {
        preCheckedIndexes.push(options.indexOf(option))
    };
});

const makeItChecked = () => {
    let checkList = document.querySelectorAll('input[type="checkbox"]');
    checkList.forEach(checkbox => {
        if (preCheckedIndexes.includes(+checkbox.id)) {
            checkbox.checked = true;
        };
    });
};
makeItChecked();

let labelList = document.querySelectorAll('label');

const notActive = () => {
    labelList.forEach(label => {
        let checkList = document.querySelectorAll('input[type="checkbox"]');
        checkList.forEach(checkbox => {
            if (label.id === checkbox.id && !checkbox.checked) {
                label.style.backgroundColor = '#fff';
            };
        });
    });
};

const isActive = (activeCheckList) => {

    labelList.forEach(label => {
        activeCheckList.forEach(checkbox => {
            if (label.id === checkbox.id) {
                label.style.backgroundColor = '#ebf2f4';
            };
        });
    });
    notActive();
};

const hasChecked = () => {
    let activeCheckList = document.querySelectorAll('input[type="checkbox"]:checked');

    isActive(activeCheckList);
    chosen.textContent = `Выбранное (${activeCheckList.length})`;
}
firstCheckBlock.addEventListener('change', hasChecked);

const showOptions = () => {
    firstCheckBlock.style.display = 'flex';
}
const hideOptions = () => {
    firstCheckBlock.style.display = 'none';
}

firstSelect.onclick = showOptions;
showSelectedButton.onclick = showOptions;
arrow.onclick = hideOptions;

const toInput = (checkList) => {
    let values = [];
    checkList.forEach(item => {
        values.push(item.value);
    });
    if (values.length === 1) {
        firstSelect.setAttribute('placeholder', `${values[0]}`);
    } else if (values.length > 1) {
        firstSelect.setAttribute('placeholder', `${values[0]}   и другие`);
    } else {
        firstSelect.setAttribute('placeholder', 'Выберете товары');
    };
};
const checkedCount = () => {
    let checkList = document.querySelectorAll('input[type="checkbox"]:checked');
    showSelectedButton.textContent = `Показать выбранное (${checkList.length})`;
    hideOptions();
    toInput(checkList);
};
applyButton.onclick = checkedCount;

const hasUnChecked = () => {
    const checkList = document.querySelectorAll('input[type="checkbox"]');
    checkList.forEach((item => {
        item.checked = false;
    }));
    hasChecked();
};
clear.onclick = hasUnChecked;

