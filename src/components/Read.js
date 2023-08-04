import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Read() {
  const [data, setData] = useState([]);

  const history = useNavigate();

  function getData() {
    axios
      .get("https://64cc9e642eafdcdc851a0a45.mockapi.io/crud-demo")
      .then((res) => {
        setData(res.data);
      });
  }

  function hendleDelete(id) {
    axios
      .delete(`https://64cc9e642eafdcdc851a0a45.mockapi.io/crud-demo/${id}`)
      .then(() => {
        getData();
      });
  }

  const hendleUpdate = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    history("/update");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-3xl mb-4 font-medium">Read Opration</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((allData, i) => {
              return (
                <tr key={i} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {allData.id}
                  </th>
                  <td className="px-6 py-4">{allData.name}</td>
                  <td className="px-6 py-4">{allData.email}</td>
                  <td>
                    <div>
                      <button
                        onClick={() =>
                          hendleUpdate(allData.id, allData.name, allData.email)
                        }
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => hendleDelete(allData.id)}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
