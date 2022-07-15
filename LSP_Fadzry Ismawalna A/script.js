var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//MENAMPILKAN DATA
function readFormData() {
    var formData = {};
    formData["kode"] = document.getElementById("kode").value;
    formData["nama"] = document.getElementById("nama").value;
    formData["jumlah"] = document.getElementById("jumlah").value;
    formData["harga"] = document.getElementById("harga").value;
    formData["total"]=formData["harga"] * formData["jumlah"];
    if(formData["total"]>=100000){
        formData["diskon"]=0.25*formData["total"];
    } else{
        formData["diskon"]=0;
    }

    formData["bayar"]=formData["total"] - formData["diskon"];

    return formData;
}

//INPUT DATA
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.kode;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.nama;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.jumlah;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.harga;
    cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.total;
    cell6 = newRow.insertCell(5);
        cell6.innerHTML = data.diskon;
    cell7 = newRow.insertCell(6);
        cell7.innerHTML = data.bayar;
    cell8 = newRow.insertCell(7);
        cell8.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//UPDATE DATA
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("kode").value = selectedRow.cells[0].innerHTML;
    document.getElementById("nama").value = selectedRow.cells[1].innerHTML;
    document.getElementById("jumlah").value = selectedRow.cells[2].innerHTML;
    document.getElementById("harga").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.kode;
    selectedRow.cells[1].innerHTML = formData.nama;
    selectedRow.cells[2].innerHTML = formData.jumlah;
    selectedRow.cells[3].innerHTML = formData.harga;
    selectedRow.cells[4].innerHTML = formData.total;
    selectedRow.cells[5].innerHTML = formData.diskon;
    selectedRow.cells[6].innerHTML = formData.bayar;
}

//HAPUS DATA
function onDelete(td) {
    if (confirm('Anda Yakin Ingin Menghapus Data Ini?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//RESET FORM
function resetForm() {
    document.getElementById("kode").value = '';
    document.getElementById("nama").value = '';
    document.getElementById("jumlah").value = '';
    document.getElementById("harga").value = '';
    selectedRow = null;
}