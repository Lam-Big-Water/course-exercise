'use strict';

// Data

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };
  
  const accounts = [account1, account2, account3, account4];


// todo: Create user name
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  });
};
createUsername(accounts);

// todo: Create login part
// * get element
const app = document.querySelector('.app');
const welcome = document.querySelector('.welcome');
const accountName = document.querySelector('.login__input--user');
const accountPin = document.querySelector('.login__input--pin');
const loginBtn = document.querySelector('.login__btn');
let currentAccount;

// * Create login system
loginBtn.addEventListener('click', function (e) {
e.preventDefault();

currentAccount = accounts.find(acc => acc.username === accountName.value);
console.log(currentAccount);

if (currentAccount?.pin === Number(accountPin.value)) {
  // * Display UI and message
  welcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')}`;
  app.style.opacity = 100;
}

// * Clear input fields
accountName.value = accountPin.value = '';
accountPin.blur();

// displayMovements(currentAccount.movements);
// calcDisplayBalance(currentAccount);
// calcDisplaySummary(currentAccount);
updateUI(currentAccount);

})




//-----------------------------------------------------------------------------

// todo: Dynamically Transactions list data
// * get elements
const containerMovements = document.querySelector('.movements');

// * generate data
const displayMovements = function (acc) {
  console.log(acc.movements);
    containerMovements.innerHTML = '';

    acc.movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
        `;
        // todo: The insertAdjacentHTML() method of the Element interface parses the specified text
        // todo: -as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.
        // * 'afterbegin' Just inside the element, after its last child.
        containerMovements.insertAdjacentHTML('afterbegin', html)
    })
}

// todo: create account balance summary
// * get element
const labelBalance = document.querySelector('.balance__value');
// * create balanceSum
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
}

// todo: create account summary part
// * get element
const sumInt = document.querySelector('.summary__value--in');
const sumOut = document.querySelector('.summary__value--out');
const sumInterest = document.querySelector('.summary__value--interest');
// * create summary data
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((mov, cur) => mov + cur, 0);
    sumInt.textContent = `${incomes}€`;

    const payout = acc.movements
    .filter(mov => mov < 0)
    .reduce((mov, cur) => mov + cur, 0);
    sumOut.textContent = `${Math.abs(payout)}€`;

    const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
    sumInterest.textContent = `${interest}€`
}

// todo: transfer part
// * get element
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputTransferBtn = document.querySelector('.form__btn--transfer');

// * create event
inputTransferBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();

  if (
    // * verity
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // * Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    console.log('valid');

    // Update UI
    updateUI(currentAccount);
    // displayMovements(currentAccount.movements);
    // calcDisplayBalance(currentAccount);
    // calcDisplaySummary(currentAccount);
  }
})

// todo: refresh
const updateUI = function (acc) {
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
}