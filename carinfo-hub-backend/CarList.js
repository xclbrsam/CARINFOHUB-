function CarList() {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedFuel, setSelectedFuel] = useState('');
    const [selectedTransmission, setSelectedTransmission] = useState('');
    
    const handleFilter = async () => {
      try {
        const response = await fetch(
          `/api/cars?brand=${selectedBrand}&fuel=${selectedFuel}&transmission=${selectedTransmission}`
        );
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching filtered cars:', error);
      }
    };
  
    return (
      <div className="filters">
        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value="">Select Brand</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Mahindra">Mahindra</option>
          {/* Add other brands */}
        </select>
  
        <select value={selectedFuel} onChange={(e) => setSelectedFuel(e.target.value)}>
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>
  
        <select value={selectedTransmission} onChange={(e) => setSelectedTransmission(e.target.value)}>
          <option value="">Select Transmission</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
          <option value="DCT">DCT</option>
          <option value="iMT">iMT</option>
        </select>
  
        <button onClick={handleFilter}>Apply Filters</button>
        <button onClick={() => {
          setSelectedBrand('');
          setSelectedFuel('');
          setSelectedTransmission('');
          handleFilter();
        }}>Reset Filters</button>
      </div>
    );
  }