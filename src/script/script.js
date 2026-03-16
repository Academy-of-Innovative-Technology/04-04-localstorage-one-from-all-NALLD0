var Database = {
  keyName: "Mutant Database",
  data: []
};

function loadDataSource() {

  var storeData = localStorage.getItem(Database.keyName);

  if (storeData) {
    Database.data = JSON.parse(storeData).response;
  } else {
    Database.data = [];
  }

  var selectHTML = '<option value="-1" selected> </option>';
  Database.data.forEach(function(mutant, index) {
    selectHTML += `<option value="${index}">${mutant.name.alias}</option>`;
  });
  document.querySelector('#select-mutant').innerHTML = selectHTML;

}


function searchForMutantByAlias(mutantAlias) {

  var index = -1;

  Database.data.forEach(function(mutant, i) {
    if (mutant.name.alias === mutantAlias) {
      index = i;
    }
  });


  if (index === -1) {
    alert("Invalid Alias");
  } else {
    displayData(index);
  }
}


function displayData(index) {

  var mutant = Database.data[index];

  var htmlTemplate = `<div class="card mb-4">
      <div class="row g-0">
        <div class="col-md-4 text-center p-3">
          <img src="${mutant.image}" class="img-fluid rounded" alt="${mutant.name.alias}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h3 class="card-title">${mutant.name.alias} (${mutant.name.firstName} ${mutant.name.lastName})</h3>
            <p><strong>Gender:</strong> ${mutant.profile.gender}</p>
            <p><strong>Eyes:</strong> ${mutant.profile.eyes}</p>
            <p><strong>Hair:</strong> ${mutant.profile.hair}</p>
            <p><strong>Height:</strong> ${mutant.profile.height}</p>
            <p><strong>Powers:</strong> ${mutant.powers.join(', ')}</p>
            <p><strong>Affiliations:</strong> ${mutant.affiliation.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>`;



  document.querySelector("#results-section").innerHTML = htmlTemplate;
}


function getSelectedValue() {
  const selectElement = document.querySelector('#select-mutant');
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const selectedText = selectedOption.text;


  if (selectedOption.value !== "-1") {
    searchForMutantByAlias(selectedText);
  } else {
    document.querySelector("#results-section").innerHTML = "";
  }


  // TEST METHOD // REMOVE OR HIDE


}

document.querySelector("#select-mutant").addEventListener('change', getSelectedValue);



// CALL BY DEFAULT
loadDataSource();