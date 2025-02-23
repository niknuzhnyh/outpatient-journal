// google btn
// Функція для обробки колбека після авторизації
function handleCredentialResponse(response) {
  // Розкодовуємо JWT токен (якщо потрібно)
  const decodedToken = parseJwt(response.credential);
  console.log("Розкодований токен:", decodedToken);
}

// Функція для розкодування JWT токену
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

// инит дэйтпикера

document.addEventListener("DOMContentLoaded", function () {
  let datepickerElem = document.querySelector(".dateInpt");
  let instanceDatePicker = M.Datepicker.init(datepickerElem, {
    format: "dd.mm.yyyy",
    defaultDate: new Date(),
    setDefaultDate: true,
  });
});

// запрос автокомплита

// fetch(`${getAutoCompliteUrl + passStr}`, {
//   redirect: "follow",
// })
//   .then((response) => {
//     if (response.status != 200) {
//       let error = new Error(
//         `Помилка '${response.statusText}' код відповіді '${response.status}' . Зверніться до адміністратора`
//       );
//       throw error;
//     }
//     return response.json();
//   })
//   .then((data) => {
//     autocompleteData = data;

//     let personsArr = data.persons;
//     let itemsArr = data.items;

//     let personInptDataOptions = {
//       data: {},
//     };
//     personsArr.forEach((e) => {
//       personInptDataOptions.data[e] = null;
//     });

//     let itemInptDataOptions = {
//       data: {},
//     };
//     itemsArr.forEach((e) => {
//       itemInptDataOptions.data[e] = null;
//     });

//     autocompleteData = {
//       itemInptDataOptions,
//       personInptDataOptions,
//     };

//     let personInptElem = document.querySelector(".personInpt");
//     let personInptInstances = M.Autocomplete.init(
//       personInptElem,
//       personInptDataOptions
//     );

//     let itemsInptElem = document.querySelector(".itemInpt");
//     let itemsInptInstances = M.Autocomplete.init(
//       itemsInptElem,
//       itemInptDataOptions
//     );
//   });

// відображення звільнення 
document.getElementById("exemption").addEventListener("change", (e) => {
  console.log("YO!!!")
  document.getElementById("exemptionTime").classList.toggle("hidden");
})


// функція додавання поля , для вводу айтома

function addItemInpt(e) {
  const row = document.createElement("div");
  row.classList.add("row", "inptWrap");

  const inputWrap = document.createElement("div");
  inputWrap.classList.add("input-field", "col", "s12");

  const inpt = document.createElement("input");
  inpt.type = "text";
  inpt.classList.add("autocomplete", "itemInpt");
  inpt.placeholder = "Препарат";

  const numInpt = document.createElement("input");
  numInpt.type = "number";
  numInpt.placeholder = "№";
  numInpt.classList.add("itemNumInpt");
  numInpt.value = 1;

  inputWrap.appendChild(inpt);
  inputWrap.appendChild(numInpt);
  row.appendChild(inputWrap);

  const itemsDiv = document.getElementById("items");
  itemsDiv.appendChild(row);
}

// add item

document.getElementById("addItemBtn").addEventListener("click", (e) => {
  addItemInpt();

  let itemInptDataOptions = autocompleteData.itemInptDataOptions;

  let itemsInptElem = document.querySelectorAll(".itemInpt");
  let itemsInptInstances = M.Autocomplete.init(
    itemsInptElem,
    itemInptDataOptions
  );
});

// send form

document.getElementById("submitForm").addEventListener("click", (e) => {
  let reqPayload = {};

  reqPayload.person = document.getElementById("person-input").value;
  reqPayload.date = document.getElementById("date-input").value;

  // create items array
  let inptGrups = document.getElementsByClassName("inptWrap");
  let items = [];
  for (let el of inptGrups) {
    let item = {};
    item.itemName = el.children[0].children[0].value;
    item.itemVolume = el.children[0].children[2].value;
    items.push(item);
  }

  reqPayload.items = items;

  console.log(reqPayload); // можна подивитись, Що ми будемо відправляти

  // тут буде відправка форми

  console.log("Sending form");
});

console.log("4.5.0");