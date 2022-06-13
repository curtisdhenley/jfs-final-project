const jess = new ItemsController();

let submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function(event){
    // <form action="/action_page.php">
    //     <label for="imgURL">Image URL</label><br>
    //     <input type="text" id="img" name="img" placeholder="http://www.img.png"><br><br>
    //     <label for="symbol">Ticker Symbol</label><br>
    //     <input type="text" id="symbol" name="symbol" placeholder="META"><br><br>
    //     <label for="price">Stock Price</label><br>
    //     <input type="text" id="price" name="price" placeholder="100.00"><br><br>
    //     <input type="submit" id="submitBtn" value="Submit">
    //   </form> 
event.preventDefault();
    
    let imgURL = document.getElementById("imgURL");
    let symbol = document.getElementById("symbol");
    let price = document.getElementById("price");

    // gearManager.addGear(gearURL.value, gearCategory.value, gearType.value, gearPrice.value);
    // bob.addItem("https://www.marketbeat.com/logos/apple-inc-logo.png", "appl", "1734.42", bob.currentTime());

    jess.addItem(imgURL.value, symbol.value, price.value, jess.currentTime());
    
    // localStorage.setItem("classID", JSON.stringify(bob.currentID));
   // localStorage.setItem("stocks", JSON.stringify(bob.items));
    
   localStorage.setItem("classID", JSON.stringify(jess.currentID));
   localStorage.setItem("stocks", JSON.stringify(jess.items));

    // gearManager.setLocalStorage();

    //**** we need to come back ****
    // gearRows.innerHTML = '';
   
   
   
    const renderListFromLocal = () => {
        // we want to loop through our array and display each item by adding it to our last
        //***Come back b/c there no such thing as loadlocalstorage*** /
        jess.loadLocalStorage();
        let stocks = jess.items;
    
        for (let i = 0; i < stocks.length; i++){
      
          // row aren't displaying on the page. Clear local storage and give it a real image.
            let newRow = document.createElement("tr");
            newRow.setAttribute("data-id", stocks[i].id);
            newRow.innerHTML = `
            <th scope="row"><img class="img-thumbnail" src="${stocks[i].url}"></th>
            <td>${stocks[i].type}</td>
            <td>${stocks[i].category}</td>
            <td>${stocks[i].price}</td>`;
            gearRowsTable.append(newRow); 
          
        }
    }
   
   
   
   
   
   
   
   
   
   
   
    renderListFromLocal();


    gearPrice.value = "";
    gearCategory.value = "";
    gearType.value = "";
    gearURL.value = "";
    })

