//Attention someone needs to remove @ts-ignore in this file for code sake

import React, { Component } from 'react';
import './SideBar.scss';
import Images from '../../containers/Images/Image';
import { withRouter } from 'react-router-dom';
import { categoryArray, subCategoryArray } from '../../env';
import { Link, NavLink } from 'react-router-dom';




// export default SideBar;
//@ts-ignore
const Sidebar = props => {
  const listOfCategories = [];
  const listofListOfSubCategories = [];


  for (const categoryId in categoryArray) {
    const listOfSubCategories = [];

    for (const subCategoryId in subCategoryArray[categoryId]) {
      const url = `/List/${categoryArray[categoryId].toLowerCase().split(' ').join('-')}/${subCategoryArray[categoryId][subCategoryId].toLowerCase().split(' ').join('-')}`;
    
      if(props.parentProps?.categoryId == categoryId)  {
        listOfSubCategories.push(
          <li key={url} onClick={() => props.history.push(url)}>{subCategoryArray[categoryId][subCategoryId]}</li>
        );
      }
    }


    if(props.parentProps?.categoryId == categoryId)  {
    listOfCategories.push(
      <>
        <li>
          <a 
            onClick={() => props.history.push(`/List/${categoryArray[categoryId].toLowerCase().split(' ').join('-')}`)}
            className={props.match.params.category === categoryArray[categoryId].toLowerCase()
              ? 'menu-lef-act' : ''}>
            {categoryArray[categoryId]}
          </a>
        </li>
      </>
    );
    listofListOfSubCategories.push(listOfSubCategories)
  }
}
  let str = props.location.patname
  console.log('listOfCategories', listofListOfSubCategories);
  console.log('props location', props.location.pathname);

  let obj=listofListOfSubCategories[3]
  let myArr =listofListOfSubCategories.indexOf(obj);
  console.log('myArr',myArr);


  if (props.location.pathname === '/') return null;
  return (
    <>
      <section>
        {/* LEFT SIDE NAVIGATION MENU */}
        <div className="menu moz-scroll-width">
          <ul>
            {/* MAIN MENU */}
            <li>
              <a
                onClick={() => props.history.push(`/allCategory`)}
                className="allCategory-txt">
                 All Category</a>
            </li>
            {listOfCategories}
          </ul>
          <ul>
            {/* MAIN MENU */}
            <li>
              <a
                onClick={() => props.history.push(`/allCategory`)}
                className="sub-category"></a>
            {listofListOfSubCategories}
            </li>
          </ul>
        </div>
      </section>
      {/* <Sidebar /> */}
    </>
  );
}

export default withRouter(Sidebar);