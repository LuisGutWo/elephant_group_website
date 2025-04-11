import React from 'react';
//= Components
import SideMenu from '../Shop/SideMenu';
import Products from '../Shop/Products';

function List() {
  return (
    <section className="main-shop section-padding">
      <div className="container">
        <div className="row md-marg">
          <SideMenu />
          <Products />
        </div>
      </div>
    </section>
  )
}

export default List