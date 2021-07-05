function validateForm() {
  let x = document.forms["form"]["name"].value;
  if (x == "") {
    alert("Insert a name");
    return false;
  }else{
      setData();
  }
}

async function setData() {
    // select the target element
    const list = document.getElementById("result");
    while (list.hasChildNodes()) {  
        list.removeChild(list.firstChild);
    }

    data = await getDataOfNationalize(document.forms["form"]["name"].value);
    data.forEach(async element => {
        country_name = await getDataOfCountry(element.country_id)
        var new_element = document.createElement("li");
        new_element.innerHTML = country_name;
        document.getElementById("result").appendChild(new_element);
        new_element.classList.add("list-group-item");  
    });
}


async function getDataOfNationalize(name) {
    let url = 'https://api.nationalize.io?name=' + name;
    try {
        let res = await fetch(url);
        json = await res.json();
        return json.country;
    } catch (error) {
        console.log(error);
    }
}

async function getDataOfCountry(country) { 
    let url = 'https://restcountries.eu/rest/v2/alpha/' + country;
    try {
        let res = await fetch(url);
        json = await res.json();
        console.log(json);
        return json.name;
    } catch (error) {
        console.log(error);
    }
}