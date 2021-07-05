function validateForm() {
  let x = document.forms["form"]["name"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
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
        var para = document.createElement("li");
        para.innerHTML = country_name;
        document.getElementById("result").appendChild(para);  
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