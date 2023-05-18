import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const RecordsTable = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [registeredVehicleInfo, setRegisteredVehicleInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://apistaging.boiibonline.ng/api/VehiclePremiumPolicyHolder/GetByFirmId?FirmId=a9a4c543-f958-4bd0-8e24-41e1d0a111e0&PageNumber=${currentPage}&PageSize=${pageSize}`
        );
        const data = await response.json();
        setRecords(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error('Error fetching records. Please try again later.');
        console.error('Error fetching records:', error);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  const handleView = async (id) => {
    setSelectedRecord(id);
    const toastId = toast.loading('Please wait...');
    try {
      const response = await fetch(
        `https://apistaging.boiibonline.ng/api/VehiclePremiumPolicyHolder/GetRegVehiclePolicyDetailsById?Id=${id}`
      );
      const data = await response.json();
      setRegisteredVehicleInfo(data.RegisteredVehicleInfoModel);
      toast.update(toastId, {
        render: 'Image added',
        type: 'success',
        icon: '👌',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
      });
    } catch (error) {
      toast.error('Error fetching registered vehicle info. Please try again later.');
      console.error('Error fetching registered vehicle info:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="records-table-container">
      {isLoading ? (
        <table className="records-table">
          <thead>
            <tr>
              <th>
                <Skeleton height={20} width={100} />
              </th>
              <th>
                <Skeleton height={20} width={150} />
              </th>
              <th>
                <Skeleton height={20} width={120} />
              </th>
              <th>
                <Skeleton height={20} width={80} />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: pageSize }).map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton height={20} />
                </td>
                <td>
                  <Skeleton height={20} />
                </td>
                <td>
                  <Skeleton height={20} />
                </td>
                <td>
                  <Skeleton height={20} width={60} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="records-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Date Registered</th>
              <th scope="col">Firm Name</th>
              <th scope="col">Views</th>
            </tr>
          </thead>
          <tbody>
            {records.Items?.map((record) => (
              <tr key={record.Id}>
                <td>{record.Name}</td>
                <td>{record.DateRegistered}</td>
                <td>{record.FirmName}</td>
                <td>
                  <button onClick={() => handleView(record.Id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedRecord && (
        <div className="registered-vehicle-info">
          <h2>Registered Vehicle Info</h2>
          {registeredVehicleInfo.map((imageData) => (
            <img
              key={imageData.Id}
              src={`data:image/jpeg;base64,${imageData.BackViewUrl}`}
              alt="Registered Vehicle"
              className="vehicle-image"
            />
          ))}
        </div>
      )}

      <div className="pagination-section">
        <div className="page-buttons">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!records.HasPrevious}
            className="pagination-button"
          >
            Previous Page
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!records.HasNext}
            className="pagination-button"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordsTable;
