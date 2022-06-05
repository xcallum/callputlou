
// Global Variables

const underlyingCode = document.querySelector('#underlying');
const baseUnits = document.querySelector('#base-units');

const callCode = document.querySelector('#call-code');
const putCode = document.querySelector('#put-code');

const callInput = document.querySelector('#call-delta');
const putInput = document.querySelector('#put-delta');

const resultContainer = document.querySelector('.result-container')
const submitBtn = document.querySelector('#calculate');

// Constructor 

class Result{
    constructor(underlying, baseUnits, callCode, callAmt, putCode, putAmt){
        this.underlying = underlying;
        this.baseUnits = baseUnits;
        this.callCode = callCode;
        this.callAmt = callAmt;
        this.putCode = putCode;
        this.putAmt = putAmt;
        this.id = Math.random();
    }
}

// Function: Add new Result in UI

function addResultToList(result) {
    const newUIResult = document.createElement('div');
    newUIResult.classList.add('result');
    newUIResult.innerHTML= `
    <div class="result__btns">
        <button class="result__btn result__delete"> ❌ </button>
    </div>  
    <h2 class="result__heading">${result.underlying}</h2>
    <p class="result__title"> call warrant : put warrant</p>
    <p class="result__body">${result.callCode} : ${result.putCode}</p>
    <p class="result__title"> call amount : put amount</p>
    <p class="result__body">${result.callAmt} : ${result.putAmt}</p>
    `;

    resultContainer.appendChild(newUIResult);
}


// Event: Note Form Submit

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // validate inputs
    if ( underlyingCode.value.length > 0 && baseUnits.value.length >0) {
        
        let callFactor = callInput.value/putInput.value
    
        let put = (baseUnits.value) * callFactor
        const putAmt = Math.round(put/10000)*10000
        // const putAmt = put
        const callAmt = baseUnits.value
        
        const newResult = new Result(underlyingCode.value, baseUnits.value, callCode.value, callAmt, putCode.value, putAmt);
        addResultToList(newResult);

        underlyingCode.value = '';
        baseUnits.value = '';
        callCode.value = '';
        putCode.value = '';
        callInput.value = '';
        putInput.value = '';

        underlyingCode.focus();
    }
  });

// Feature: Calculate on Enter key

document.addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
      submitBtn.click()
    }
})

// Function: Remove button deletes the result

resultContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('result__delete')){
      const currentResult = e.target.closest('.result');
      console.log('Removing Selected Result')
      currentResult.remove();
    }
  })