class MyWallet {
    constructor(){
        this.declaredBudget = document.querySelector('.show-wallet');
        this.walletWrapper = document.querySelector('.wallet-wrapper');
        this.expenseWrapper = document.querySelector('.expense-wrapper');
        this.expenseOverlay = document.querySelector('.expense-overlay');
        this.walletInput = document.querySelector('.wallet-input');
        this.saveWalletBtn = document.getElementById('saveWallet');
        this.walletForm = document.getElementById('.wallet-form');
        this.budgetAmount = document.getElementById('budget-amount');
        this.inflowAmount = document.getElementById('inflow-amount');
        this.inputAmount = document.querySelector('.input-amount');
        this.inputDate = document.querySelector('.datepicker');
        this.inputNote = document.querySelector('.input-note');
        this.expenseContent = document.querySelector('.content');
        this.content = document.querySelector('.content');
        this.transactionsArr = [];
        





        this.budgetAlert = document.querySelector('.budget-alert');
        
        this.balanceAmount = document.getElementById('balance-amount');
        this.expenseName = document.getElementById('expenseInput');
        this.expenseAmount = document.getElementById('expenseAmount');
        this.expenseAlert = document.querySelector('.expense-alert');
        this.expensesDiv = document.querySelector('.expense');
        this.addTransactionBtn = document.getElementById('addTransaction-btn');


        
        this.expensesList = [];
        
    }
    setUpIncome(){
        let walletInput = this.walletInput.value;
        if(walletInput === ""){
            alert('Value cannot be empty');                         //this.saveWalletBtn.disabled = true;   
        }
        
        this.budgetAmount.innerText = walletInput;
        this.inflowAmount.innerText = walletInput;
        this.walletInput.value = '';
        this.walletWrapper.classList.remove('wallet-open');
        this.expenseOverlay.classList.remove('expense-blur');
        
    }
    addSingleExpense(){
        let amount = this.inputAmount.value;
        let expenseDate = this.inputDate.value;
        console.log(expenseDate)
        let note = this.inputNote.value;
        let id = (this.transactionsArr.length - 1) + 1;
        let expenseObj = {amount : amount, date : expenseDate, note : note, id: id, name:name };
        this.transactionsArr.push(expenseObj);
        console.log(this.transactionsArr)
        this.transactionsArr.forEach(item => this.showExpense(item));
        this.inputAmount.value = '';
        this.inputDate.value = '';
        this.inputNote.value = '';
        this.expenseWrapper.classList.remove('expense-open');
        this.expenseOverlay.classList.remove('expense-blur');

        
    }
    showExpense(item){
        const div = document.createElement('div');
        div.classList.add('expense-layout');
        div.innerHTML = `
                <div class="expense-header"></div>
                <div class="expense-item">
                    <div class="item-date">${item.date}</div>
                    <div class="item-name">Name</div> 
                    <div class="item-cost">${item.amount}</div>
                </div>`;
         this.expenseContent.appendChild(div);       
    }





    setUpBudgetData(){
        /*let totalBudget = Storage.getBudget();
        this.budgetAmount.textContent = totalBudget;            //forEach
        let expensesList = Storage.getExpense();
        expensesList.forEach(item=> this.addExpense(item));*/
        
    }
    addExpenseBtn(){
        this.addTransactionBtn.addEventListener('click', ()=>{
            this.expenseWrapper.classList.add('expense-open');
            this.expenseOverlay.classList.add('expense-blur');

            this.expenseOverlay.addEventListener('click', ()=> {
                this.expenseWrapper.classList.remove('expense-open');
                this.expenseOverlay.classList.remove('expense-blur');
            })
            
        })
    }
    addIncome(){
        this.declaredBudget.addEventListener('click', () => {
            this.walletWrapper.classList.add('wallet-open');
            this.expenseOverlay.classList.add('expense-blur');
        this.expenseOverlay.addEventListener('click', ()=> {
            this.walletWrapper.classList.remove('wallet-open');
            this.expenseOverlay.classList.remove('expense-blur');
        })    

            
        })
    }
    /*displayBudget(){
        
        let declaredBudget = this.declaredBudget.value;
        if(declaredBudget === ""){
            this.budgetAlert.classList.add('showAlert');
            this.budgetAlert.innerHTML = `<p>Value cannot be empty</p>`;
            const self = this;
            setTimeout(function(){
            self.budgetAlert.classList.remove('showAlert');
            self.declaredBudget.value = '';                                //let declaredBudget?
            },2000);    
        }
        let walletArr = Storage.getBudget() + parseFloat(declaredBudget);           //parseFloat???
        this.budgetAmount.textContent = walletArr;
        Storage.saveTotalBudget(walletArr);
        this.declaredBudget.value = '';
        
        
    }*/
    displayExpense(){
        
        let expenseAmount = this.expenseAmount.value;
        let expenseName = this.expenseName.value;
        if(expenseAmount < 0 || expenseAmount === "" || expenseName === ""){
            this.expenseAlert.classList.add('showAlert');
            this.expenseAlert.innerHTML = `<p>Value cannot be empty or negative</p>`;
            const self = this;
            
            setTimeout(function(){
                self.expenseAlert.classList.remove('showAlert');
                self.expenseName.value = '';
                self.expenseAmount.value = '';
            },2000);
            return;
        }
        
        let getExpenses = Storage.getExpense();
        let id = (getExpenses.length - 1) + 1;
        let obj = {name : expenseName, value : parseFloat(expenseAmount), id : id};
        getExpenses.push(obj);
        this.addExpense(obj);
        //console.log(getExpense);
        Storage.saveExpense(getExpenses);
        
        this.expenseAmount.value = '';
        this.expenseName.value = '';
        
    } 
    /*addExpense(item){
            const div = document.createElement('div');
            div.classList.add('expense-item');
            div.innerHTML = `
            <h6 class="expense-title mb-0 text-uppercase list-item">${item.name}</h6>
            <h5 class="expense-amount mb-0 list-item">${item.value}</h5>
                <div class="expense-icons list-item">
                    <a href="#" class="edit-icon mx-2" data-id="${item.id}">
                    <i class="fas fa-edit"></i>
                     </a>
                    <a href="#" class="delete-icon" data-id="${item.id}">
                         <i class="fas fa-trash"></i>
                    </a>
                 </div>
            `;
            this.expensesDiv.appendChild(div);
            
            }*/
    editTransaction(){
        this.content.classList.add('.edit-expense');
        
        
    } 

    deleteExpense(item){
        let id = parseInt(item.dataset.id);
        let expenseList = Storage.getExpense();
        item.parentElement.parentElement.remove();
        expenseList = expenseList.filter(function(spending){
            return (spending.id != id);
        });
        Storage.saveExpense(expenseList);
    }
        
     
}
/*class Storage{
    static getExpense(){
        return localStorage.getItem('expenses')? JSON.parse(localStorage.getItem('expenses')) : [];
    }
    static saveExpense(list){
        
        //console.log(expenseList)
        localStorage.setItem('expenses', JSON.stringify(list)); 

    }
    static saveTotalBudget(budget){
        localStorage.setItem('budget', JSON.stringify(budget))
    }
    static getBudget(){
        return localStorage.getItem('budget') ? parseFloat(JSON.parse(localStorage.getItem('budget'))) : 0; //change to 0?
    }
}*/


function eventListeners(){
    const myWallet = new MyWallet();
    myWallet.setUpBudgetData();
    myWallet.addExpenseBtn();
    myWallet.addIncome();

    //data input
    let datePicker = document.querySelectorAll('#preDate');
    datePicker.forEach(item => {
        M.Datepicker.init(item)
    });
    


    const walletAmount = document.getElementById('wallet-form');
    const epxenseForm = document.getElementById('expense-form');
    const editExpense = document.querySelector('.content');

    walletAmount.addEventListener('submit', (e)=> {
        e.preventDefault();
        myWallet.setUpIncome();
    });
    epxenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        myWallet.addSingleExpense();
    });
    editExpense.addEventListener('click', (e)=> {
        myWallet.editTransaction(e);
    })


    /*
    const budgetInput = document.getElementById('budget-form');
    const expenseInput = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    /*budgetInput.addEventListener("submit", function(e){
        e.preventDefault(); 
        myWallet.displayBudget();
    });*/
    /*expenseInput.addEventListener('submit', function(e){
        e.preventDefault();
        myWallet.displayExpense();
    });*/
    /*expenseList.addEventListener('click', function(e){ 
        e.preventDefault();    
        if(e.target.parentElement.classList.contains('edit-icon')){ 
            myWallet.editExpense(e.target.parentElement);
        }else if(e.target.parentElement.classList.contains('delete-icon')){
            myWallet.deleteExpense(e.target.parentElement);
        }
    });*/
    
}
document.addEventListener("DOMContentLoaded", function(){
    eventListeners();
})