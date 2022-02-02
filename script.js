// array limit https://stackoverflow.com/questions/6154989/maximum-size-of-an-array-in-javascript
// source : https://gist.github.com/axelpale/3118596
// http://jsfiddle.net/tWyq6/27/  ;random light color()
// https://getbutterfly.com/generate-html-list-from-javascript-array/
// https://stackoverflow.com/questions/18848860/javascript-array-to-csv
// https://stackoverflow.com/questions/39924644/es6-generate-an-array-of-numbers









// Generate nCr and calculate
// source : https://gist.github.com/axelpale/3118596
function k_combinations(set, k) {
    var i, j, combs, head, tailcombs;
    if (k > set.length || k <= 0) {
        return [];
    }
    if (k == set.length) {
        return [set];
    }
    if (k == 1) {
        combs = [];
        for (i = 0; i < set.length; i++) {
            combs.push([set[i]]);
        }
        return combs;
    }
    combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
        head = set.slice(i, i + 1);
        tailcombs = k_combinations(set.slice(i + 1), k - 1);
        for (j = 0; j < tailcombs.length; j++) {
            combs.push(head.concat(tailcombs[j]));
        }
    }
    return combs;
}                               

function factorialOf(n) {
    var factorial=1;
    for (var i = 2; i <= n; i++) {
    factorial = factorial * i; }
    return factorial;
} 

function combinations(n,k) {
    if (k==1) { return n }
    return factorialOf(n) / ((factorialOf(k))*factorialOf(n-k));
    // n! / ( k! * (n-k)! )
}

function calcResult(n, k) {
    let result = document.createElement('p');
    result.innerHTML = `There are ${combinations(n,k)} combinations for ${n} items, given ${k} slots.`;
    textRes.innerHTML='';textRes.appendChild(result);
}

function makeArray(_size_ , _k_) {
    var gvar_n = Array.from(Array(_size_), (_,x) => x);
    resultComb = k_combinations(gvar_n , _k_);
    return resultComb;
}









// Main Button
let btnGet = document.querySelector('button');
let textRes = document.querySelector('#text-result');

function btnGenerate() {
    let var_n = parseInt(document.querySelector('#n-input').value);
    let var_k = parseInt(document.querySelector('#k-input').value);
    
    calcResult(var_n,var_k);
    
    var_k = correctingK(var_n,var_k);
    
    let combres = makeArray(var_n , var_k);
    makeList(resultComb);
    makeTable(resultComb, var_k, var_n);
    callColorChange();
}

function correctingK(n, k) {
    if (k <= n && k > 0) {
        return k;
    }
    let addWarn = document.createElement('p');
    addWarn.innerHTML = 'The K values are (currently) impossible to visualize!';
    textRes.appendChild(addWarn);
    return 1;
}











// Downloading data
// https://stackoverflow.com/questions/18848860/javascript-array-to-csv
document.querySelector('#download').addEventListener('click', () => {
    let var_n = parseInt(document.querySelector('#n-input').value);
    let var_k = parseInt(document.querySelector('#k-input').value);
    makeArray(var_n , var_k);
    var resultArr = resultComb;
    const csv = resultArr.map(row => row.map(item => (typeof item === 'string' && item.indexOf(',') >= 0) ? `"${item}"`: String(item)).join(',')).join('\n');
    const data = encodeURI('data:text/csv;charset=utf-8,' + csv.replace(/#/g, ""));
    const link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', 'ncrdata.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

const __elem__  = document.getElementById("generate");
__elem__.addEventListener("click", function abc(e) {
    document.getElementById("down-tab").disabled = false;
    __elem__.removeEventListener("click", abc);
});

function downTable() {
    var a = document.body.appendChild(
        document.createElement("a")
    );
    a.download = "ncrdata.html";
    a.href = "data:text/html," +
    '<head><style>body{background:black;}th,td{text-align:center;border:1px solid black;padding:10px;}table{border-collapse:separate;border-spacing:8px;}</style></head>'
    +(document.querySelector('#result-table').innerHTML).replace(/#/g, "");
    a.click();
}










// User Interface for data
function random_color() {
    var color = (function lol(m, s, c) {
        return s[m.floor(m.random() * s.length)] +
        (c && lol(m, s, c - 1));
    })(Math, '3456789ABCDEF', 4);   
    return '#'+color;
}

// generate table
function makeTable(tableArr,headRow,itemQty) {
    let tableobj    = document.createElement('table');
    tableobj.style.background  = "#222";
    let headerRow   = document.createElement('tr');
    let colorRow   = document.createElement('table');
    let colorChoice = []
    ;
    for (i=0; i < itemQty; ++i) {
        colorChoice.push(random_color());
        let _cl_  = document.createElement('input');
        let _td_ = document.createElement('td');
        let _tr_ = document.createElement('tr');
        _cl_.type = 'color';
        _cl_.id = 'colrow-'+i;
        _cl_.value=colorChoice[i];
        _td_.textContent= i+' : ';
        _td_.appendChild(_cl_);
        _td_.className = 'all-color';
        _tr_.appendChild(_td_);
        colorRow.appendChild(_tr_);
    }
    colorRow.appendChild(addTextColButton())
    ;
    for (m = 0; m < headRow; ++m) {
        let _th_ = document.createElement('th');
        _th_.innerHTML = 'Slot of ' + (m+1); 
        headerRow.appendChild(_th_);
    } headerRow.style.background='white';
    tableobj.appendChild(headerRow)
    ;
    for (let row of tableArr) {
        tableobj.insertRow();
        for (let cell of row) {
            let newCell = tableobj.rows[tableobj.rows.length - 1].insertCell();
            newCell.textContent = cell;
            newCell.className = 'td-num-'+cell;
            newCell.style.background = colorChoice[cell];
        }
    }
    let _temp_ = document.createElement('div');
    let _temp  = document.createElement('div');
    let _tmp__ = document.createElement('div');
    _temp_.id  = "main-table";
    _temp.id   = 'color-table';
    _tmp__.id  = "result-table";
    
    _temp.appendChild(colorRow);
    _tmp__.appendChild(tableobj);
    
    _temp_.appendChild(_temp);
    _temp_.appendChild(_tmp__);
    
    document.querySelector('#result').appendChild(_temp_);
}

function addTextColButton() {
    let _cl_ = document.createElement('input');
    let _td_ = document.createElement('td');
    let _tr_ = document.createElement('tr');
    _cl_.type = 'color';
    _cl_.id = 'text-color-change';
    _cl_.value = '#000';
    _td_.textContent = 'Text : ';
    _td_.appendChild(_cl_);
    _tr_.appendChild(_td_);
    return _tr_;
}

function callColorChange() {
    document.getElementById('color-table').replaceWith(document
    .getElementById('color-table').cloneNode(true))
    ;
    let all_col = document.getElementsByClassName('all-color');
    for (g = 0; g < all_col.length; ++g) {
        changeAddEventListener(g); 
    }
    
    let textCol = document.getElementById('text-color-change');
    textCol.addEventListener('change', () => {
        let mTable = document.getElementById('result-table');
        mTable.style.color = textCol.value;
        mTable.querySelector('table tr').style.color = '#000';
    });
}

function changeAddEventListener(_index_) {
    let colrow_choice = document.getElementById(('colrow-'+_index_));
    colrow_choice.addEventListener('change', () => {
        let all_num = document.getElementsByClassName(('td-num-'+_index_)); 
        let col_row = colrow_choice.value;
        for (h = 0; h < all_num.length; ++h) {
            all_num[h].style.background= col_row;
        }
    });
}

// // https://getbutterfly.com/generate-html-list-from-javascript-array/
function makeList(listData) {
    let target = document.querySelector('#result');
    let listContainer = document.createElement('div');
    listContainer.id = 'main-list';
    let listElement = document.createElement('ul');
    listElement.classList.add("unordered-list-items");
    var _temp_ = document.createDocumentFragment();
    // Add it to the page
    for (i = 0; i < listData.length; ++i) {
        listItem = document.createElement('li');
        listItem.innerHTML = listData[i].toString().replace(/,/g , ' ~ ');
        
        _temp_.appendChild(listItem);
    }
    listElement.appendChild(_temp_);
    target.innerHTML='';
    listContainer.appendChild(listElement);target.appendChild(listContainer)
}