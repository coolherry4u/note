var list = document.getElementById('todoList');
var row = 1;
var editAbleRowId='';
var result = JSON.parse(localStorage.getItem("prodList"));

function appendRowsToTable(val) {
    var txtNotes=val.col1;
    var txtDescription=val.col2;
    var deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode("Delete"));
    deleteButton.setAttribute('onClick','removeName("'+val.row+'", this)');
    var editButton = document.createElement('button');
    editButton.appendChild(document.createTextNode("Edit"));
    editButton.setAttribute('onClick','editName("'+val.row+'")');
    var table = document.getElementById("insert");
    var tbaleRow = table.parentNode.insertRow(row);
    tbaleRow.insertCell(0).innerHTML = txtNotes;
    tbaleRow.insertCell(1).innerHTML = txtDescription;
    tbaleRow.insertCell(2).appendChild(editButton);
    tbaleRow.insertCell(3).appendChild(deleteButton);
    row++;
}

if(result != null) {
    for(var i=0;i<result.length;i++) {
        appendRowsToTable(result[i]);
    }
}

document.getElementById("btnCancel").onclick =function(){
    document.getElementById("txtNotes").value='';
    document.getElementById("txtDescription").value='';
    editAbleRowId='';
}

document.getElementById("btnSave").onclick =function(){
    if (document.getElementById("txtNotes").value !='' && document.getElementById("txtDescription").value!='') {        
        if (editAbleRowId) {
            var result = JSON.parse(localStorage.getItem("prodList"));
            if(result != null) {
                for(var i=0;i< result.length;i++) {
                    if (result[i].row==editAbleRowId) {
                        result[i].col1=document.getElementById("txtNotes").value;
                        result[i].col2=document.getElementById("txtDescription").value;
                        localStorage.setItem("prodList", JSON.stringify(result));

                        var deleteButton = document.createElement('button');
                        deleteButton.appendChild(document.createTextNode("Delete"));
                        deleteButton.setAttribute('onClick','removeName("'+editAbleRowId+'", this)');

                        var editButton = document.createElement('button');
                        editButton.appendChild(document.createTextNode("Edit"));
                        editButton.setAttribute('onClick','editName("'+editAbleRowId+'")');

                        var table = document.getElementById("insert");
                        document.getElementById("insert").parentNode.deleteRow(editAbleRowId);
                        var tbaleRow = table.parentNode.insertRow(editAbleRowId); 
                        var txtNotes=document.getElementById("txtNotes").value;
                        var txtDescription=document.getElementById("txtDescription").value;           
                        tbaleRow.insertCell(0).innerHTML = txtNotes;
                        tbaleRow.insertCell(1).innerHTML = txtDescription;
                        tbaleRow.insertCell(2).appendChild(editButton);
                        tbaleRow.insertCell(3).appendChild(deleteButton);
                        editAbleRowId='';
                    }                    
                }
            }
        }
        else{
            var insert = document.getElementById("insert");
            var new_row = insert.parentNode.insertRow( insert.rowIndex + 1 );
            var txtNotes=document.getElementById("txtNotes").value;
            var txtDescription=document.getElementById("txtDescription").value;
            var result = JSON.parse(localStorage.getItem("prodList"));
            if(result == null)
            result = [];
            
            result.push({ row: row, col1:txtNotes, col2: txtDescription });
            
            // save the new result array
            localStorage.setItem("prodList", JSON.stringify(result));

            var deleteButton = document.createElement('button');
            deleteButton.appendChild(document.createTextNode("Delete"));
            deleteButton.setAttribute('onClick','removeName("'+row+'", this)');

            var editButton = document.createElement('button');
            editButton.appendChild(document.createTextNode("Edit"));
            editButton.setAttribute('onClick','editName("'+row+'")');

            var table = document.getElementById("insert");
            var tbaleRow = table.parentNode.insertRow(row);
            

            tbaleRow.insertCell(0).innerHTML = txtNotes;
            tbaleRow.insertCell(1).innerHTML = txtDescription;
            tbaleRow.insertCell(2).appendChild(editButton);
            tbaleRow.insertCell(3).appendChild(deleteButton);
            row++;
        }
        document.getElementById("txtDescription").value='';
        document.getElementById("txtNotes").value='';
    }
}

function removeName(itemid, btn){
  var result = JSON.parse(localStorage.getItem("prodList"));
  if(result != null) {
      for(var i=0;i<result.length;i++) {
        if (result[i].row==itemid) {
          result.splice(i, 1);          
          localStorage.setItem("prodList", JSON.stringify(result));
                //document.getElementById("insert").deleteRow(btn.parentNode.parentNode.rowIndex);
                var row = btn.parentNode.parentNode;
                row.parentNode.removeChild(row);
        }
          document.getElementById("txtNotes").value='';
            document.getElementById("txtDescription").value='';
            editAbleRowId='';    
      }
  }
}

function editName(itemid){
    var result = JSON.parse(localStorage.getItem("prodList"));
    if(result != null) {
        for(var i=0;i< result.length;i++) {
            if (result[i].row==itemid) {
                editAbleRowId=result[i].row;
                document.getElementById("txtNotes").value=result[i].col1;
                document.getElementById("txtDescription").value=result[i].col2;
            }
            
        }
    }
}