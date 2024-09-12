async function postdata(event){
    window.location.href = `index.html`
    event.preventDefault();

    let name = document.getElementById('name').value ; 
    console.log("name : ",name)
    let image = document.getElementById('image').value ;
    let price = document.getElementById('price').value ; 
    let category = document.getElementById('category').value ; 
    let use = document.getElementById('use').value ; 
    let description = document.getElementById('description').value ;
    
    let datas = {
        name,
        image,
        price,
        category,
        use,
        description,
    }

    let json_data = JSON.stringify(datas)
    console.log("json_data : ", json_data);

    let response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: json_data,
    });
    console.log("response : ", response);

    let parsed_response = await response.text();
    console.log("parsed_response : ", parsed_response)

    if (parsed_response) {
        alert(parsed_response);
        return;
    } else {
        alert("something went wrong");
    }

}

async function fetchdata(){
    
    try {
        let response = await fetch('/submit');
        console.log("response : ", response);

        let display = await response.json();
        console.log("display : ", display);

        let viewdiv = document.getElementById('viewdiv');
        let viewdiv1 = document.getElementById('viewdiv1');
        let viewdiv2 = document.getElementById('viewdiv2');

        let rows = '' 
        let rows1 = ''
        let rows2 = ''

        let arr = [''];
        let arr1 = [''];
        let arr3 = [''];


        for (i = 0; i < display.length; i++) {
            let id = display[i]._id;
            // let ids = display[i]._id;
            if(display[i].category === 'Fruits'){
                arr =
                rows = rows + `
                <div class="container  d-flex-row lh-lg pb-3 pt-3 shadow p-3 mb-5 bg-body rounded">
                  <div id = "imageid" class ="pe-3" ><img  src ="${display[i].image} "class = "datacontainerimg"></div>
                   <div id = "titleid" class ="pe-3 fs-2 fw-bold namediv">${display[i].name}</div>
                    <div class="mt-3 "><button class = "ps-2 pe-2 fs-5 twobtn" onclick="handleClick('${id}')">view more</button></div>
                    <div class="mt-3 "><button class="ps-4 pe-4 fs-5 twobtn" onclick="handleClick2('${id}')">Delete</button></div>
                    
                  </div>
               `
           }

           if(display[i].category === 'Meat'){
            arr1 = 
            rows1 = rows1 + `
            <div class="container  d-flex-row lh-lg pb-3 pt-3 mt-5 shadow p-3 mb-5 bg-body rounded">
              <div id = "imageid" class ="pe-3" ><img  src ="${display[i].image} "class = "datacontainerimg"></div>
               <div id = "titleid" class ="pe-3 fs-2 fw-bold namediv">${display[i].name}</div>
                <div class="mt-3 "><button class = "ps-2 pe-2 fs-5 twobtn" onclick="handleClick('${id}')">view more</button></div>
                <div class="mt-3 "><button class="ps-4 pe-4 fs-5 twobtn" onclick="handleClick2('${id}')">Delete</button></div>
              </div>
           `
           }
           if(display[i].category === 'Vegetables'){
            arr2 = 
            rows2 = rows2 + `
            <div class="container  d-flex-row lh-lg pb-3 pt-3 mt-5 shadow p-3 mb-5 bg-body rounded">
              <div id = "imageid" class ="pe-3" ><img  src ="${display[i].image} "class = "datacontainerimg"></div>
               <div id = "titleid" class ="pe-3 fs-2 fw-bold namediv">${display[i].name}</div>
                <div class="mt-3 "><button class = "ps-2 pe-2 fs-5 twobtn" onclick="handleClick('${id}')">view more</button></div>
                <div class="mt-3 "><button class="ps-4 pe-4 fs-5 twobtn" onclick="handleClick2('${id}')">Delete</button></div>
              </div>
           `
           }
        }

        viewdiv.innerHTML = arr;
        viewdiv1.innerHTML = arr1;
        viewdiv2.innerHTML = arr2;
    } catch (error) {
        console.log("error : ", error)
    }
}

function handleClick (id){
  window.location.href  = `product.html?id=${id}`
  console.log("id : ",id)
}

async function viewdata() {
    let location = window.location;
    console.log("location", location);

    let querystring = location.search;
    console.log("querystring", querystring);


    let urlParams = new URLSearchParams(querystring);
    console.log("url", urlParams);

    let id = urlParams.get("id");
    console.log("id ", id, typeof (id));

    try {
        let single_data = await fetch(`/user/${id}`);
        let parsed_single_data = await single_data.json();
        console.log("parsed_single_data : ",parsed_single_data);
        // let strparsed_single_data = JSON.stringify(parsed_single_data)
        let rows = `
        <div class="container  lh-lg  pb-3 pt-3 shadow p-3 mb-5 bg-body rounded mt-3 mt-5">
          <div id = "imageid1" class="text-center" ><img  src ="${parsed_single_data.image} "class = "single_datacontainerimg"></div>
                     <div id = "titleid1" class = "mt-3 fw-bold fs-1">Product : ${parsed_single_data.name}</div>
                     <div id = "categoryid1" class="fst-normal fs-3">Price : ${parsed_single_data.price}</div>
                     <div id = "ratingid1" class="fst-normal fs-3">Category : ${parsed_single_data.category}</div>
                     <div id = "ratingid1" class="fst-normal fs-3">use : ${parsed_single_data.use}</div>
                     <div id = "ratingid1" class="fst-normal fs-3">Description : ${parsed_single_data.description}</div>
                     <div class="ms-5 mt-2 "><button onclick="handleClick1('${id}')" class = "detailsbtn ps-4 pe-4 fs-4">Edit</button></div>
                    
                     </div>
           </div>
        `
        document.getElementById('single_datacontainer').innerHTML = rows;


    } catch (error) {
        console.log("error : ",error);
    }
}

function handleClick1(id){

    // let strparsed_single_data = buttonElement.getAttribute('data-user');

    // let edit_data = JSON.parse(strparsed_single_data);

    window.location.href =  `update.html?id=${id}`
}


async function updatedata(event) {

    event.preventDefault();

    let name = document.getElementById('name').value
    console.log("name", name)
    let image = document.getElementById('image').value
    let price = document.getElementById('price').value
    let category = document.getElementById('category').value
    let use = document.getElementById('use').value
    let description = document.getElementById('description').value

    let datas = {
        name,
        price,
        image,
        category,
        use,
        description,
    }

    let stringyfydata = JSON.stringify(datas)
    console.log("stringyfydata", stringyfydata);

    let params = new URLSearchParams(window.location.search);
    console.log("params", params);

    let id = params.get('id')
    console.log("id from update data", id);

    try {
        let response = await fetch(`/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: stringyfydata

        })
        let parsed_response = await response.json();
        console.log('parsed_response', parsed_response);

        window.location.href =  `product.html?id=${id}`

        if(parsed_response){
            alert("Data Updated Successfully")
        }

    } catch (error) {
        console.log("error", error);
    }
}

async function handleClick2(id){
    let params = new URLSearchParams(window.location.search);
    console.log("params", params);

    // let id = params.get('id')
    // console.log("id from delete data", id);

    try {
       let deletedata = await fetch(`/user/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json"
            },
        })
        let parsed_deletedata = await deletedata.json();
        console.log("parsed_deletedata : ",parsed_deletedata);
    
        window.location.href  = `index.html?id=${id}`

    } catch (error) {
        console.log("error", error);
    }
}

async function formdata(){
    let params = new URLSearchParams(window.location.search);
    console.log("params", params);

    let id = params.get('id')
    console.log("id from update data", id);


    let name = document.getElementById('name');
    let category = document.getElementById('category');
    let price = document.getElementById('price');
    let image = document.getElementById('image');
    let use = document.getElementById('use');
    let description = document.getElementById('description');


    try {
        let form_response = await fetch(`/user/${id}`);
        let form_parse_data = await form_response.json();

         name.value = form_parse_data.name
         category.value = form_parse_data.category
         price.value = form_parse_data.price
         image.value = form_parse_data.image
         use.value = form_parse_data.use
         description.value = form_parse_data.description
    } catch (error) {image
        console.log("error : ",error)
    }
}