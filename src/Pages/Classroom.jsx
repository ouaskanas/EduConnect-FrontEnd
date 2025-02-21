import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import SuggestionsSidebar from "../Component/SuggestionsSidebar";

function Classroom() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    fetch("/api/v1/classroom/allclassrooms")
      .then((response) => response.json())
      .then((data) => setClassrooms(data))
      .catch((error) => console.error("Error fetching classrooms:", error));
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid" style={{ paddingTop: 100 }}>
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-6">
            <div className="classroom-box p-3 border rounded mt-3">
              <h5>Classrooms</h5>
              <div className="classroom-list border p-4 mb-2" style={{ height: "500px", overflowY: "auto" }}>
                {classrooms.length > 0 ? (
                  classrooms.map((classroom, index) => (
                    <div key={index} className="classroom-item bg-light p-2 rounded mb-1">
                      {classroom.name}
                    </div>
                  ))
                ) : (
                  <p>Aucune salle de classe disponible.</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <SuggestionsSidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Classroom;
