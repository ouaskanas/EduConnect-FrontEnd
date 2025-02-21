import React from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import PostList from "../Component/PostList";
import SuggestionsSidebar from "../Component/SuggestionsSidebar"; 

function Homepage() {
  return (
    <>
      <Header />
      <div className="container-fluid" style={{paddingTop: 100}}>
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-6">
            <PostList />
          </div>
          <div className="col-md-3">
            <SuggestionsSidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
