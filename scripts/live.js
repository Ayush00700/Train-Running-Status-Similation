function addoptions(train_list){
    for(train in train_list){
        var x = document.getElementsByTagName('select')[0];
        var option = document.createElement("option");
        option.value = train_list[train]['train_name'];
        // console.log(option.value);
        option.text = train_list[train]['train_name'];
        x.add(option);

    }
}


fetch('/alltrains').then(res=>{
    return res.json()
}).then(res=>{
    addoptions(res)
})

function displaystatus(){
    var x = document.getElementsByTagName('select')[0];
    fetch(`trainstatus/${x.value}`).then(res=>{
        return res.json()
    }).then(res=>{
        console.log(res)
        addtable(res)
    })
}

function addtable(status){
    let tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = ""
    for(station in status){
        console.log(`${status[station]['timegap_in_mins']}`)
    }
    for(station in status){
        let row_2 = document.createElement('tr');
        let row_2_data_1 = document.createElement('td');
        row_2_data_1.innerHTML = status[station]['station_no'];
        let row_2_data_2 = document.createElement('td');
        row_2_data_2.innerHTML = `${status[station]['timegap_in_mins']}`;
        let row_2_data_3 = document.createElement('td');
        row_2_data_3.innerHTML = status[station]['status'];

        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);
        row_2.appendChild(row_2_data_3);
        tbody.appendChild(row_2);
    }
}
