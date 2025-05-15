import React, { useState } from 'react';

const Duplicate = () => {
  const [inputArr, setInputArr] = useState('2,3,1,2,3');
  const [result, setResult] = useState(null);

  const Duplicate = (arr) => {
    let freq = {};
    let dup = [];
    for (let num of arr) {
      freq[num] = (freq[num] || 0) + 1;
    }
    for (let key in freq) {
      if (freq[key] > 1) {
        dup.push(Number(key));
      }
    }
    return dup;
  };

  const handleDuplicate = () => {
    let arr = inputArr
      .split(',')
      .map((str) => Number(str.trim()))
      .filter((val) => !isNaN(val));

    if (arr.length === 0) {
      alert('Please enter a valid array');
      return;
    }

    const findDup = Duplicate(arr);
    setResult(findDup);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1176400518/photo/abstract-technical-surface.webp?a=1&b=1&s=612x612&w=0&k=20&c=MWw3eu9qUl2LJirYeekg-aYUPZh1eIsQye-tVxBfQdU=')",
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Find Duplicate Elements</h1>
        <input
          type="text"
          value={inputArr}
          onChange={(e) => setInputArr(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter comma separated numbers e.g. 1,2,3,2"
        />
        <button
          onClick={handleDuplicate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Find
        </button>

        {result && (
          <div className="mt-6 text-lg text-gray-700">
            {result.length > 0 ? (
              <div className='border-2 border-blue-600 rounded-md'>
                <p className="font-semibold">Duplicate Numbers:</p>
                <p>{result.join(', ')}</p>
              </div>
            ) : (
              <p>No Duplicates Found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Duplicate;
