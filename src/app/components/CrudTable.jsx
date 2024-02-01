// components/CrudTable.js

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const CrudTable = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [formData, setFormData] = useState({}); // Form data for add/edit

  useEffect(() => {
    // Fetch your data from the server or any source
    // For demonstration, I'm using static data
    const fetchData = async () => {
      // Replace this with your actual data fetching logic
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const editData = (rowData) => {
    setFormData({ ...rowData });
    setDisplayDialog(true);
  };

  const deleteData = (rowData) => {
    // Implement your delete logic here
    // For demonstration, I'm just filtering out the selected row
    setData(data.filter((item) => item.id !== rowData.id));
  };

  const saveData = () => {
    // Implement your save or update logic here
    // For demonstration, I'm just updating the data array
    if (formData.id) {
      setData(data.map((item) => (item.id === formData.id ? formData : item)));
    } else {
      setData([...data, { ...formData, id: data.length + 1 }]);
    }

    setFormData({});
    setDisplayDialog(false);
  };

  const header = (
    <div>
      <Button label="Add" icon="pi pi-plus" onClick={() => setDisplayDialog(true)} />
    </div>
  );

  return (
    <div>
      <DataTable value={data} selectionMode="single" header={header} onRowSelect={(e) => setSelectedData(e.data)}>
        <Column field="id" header="ID" />
        <Column field="name" header="Name" />
        <Column field="email" header="Email" />
        <Column body={(rowData) => <Button label="Edit" icon="pi pi-pencil" onClick={() => editData(rowData)} />} />
        <Column body={(rowData) => <Button label="Delete" icon="pi pi-trash" onClick={() => deleteData(rowData)} />} />
      </DataTable>

      <Dialog header="Edit Data" visible={displayDialog} style={{ width: '50vw' }} onHide={() => setDisplayDialog(false)}>
        {/* Your form for editing data */}
        <div>
          <label>ID:</label>
          <input type="text" value={formData.id || ''} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>

        <Button label="Save" icon="pi pi-check" onClick={saveData} />
      </Dialog>
    </div>
  );
};

export default CrudTable;
