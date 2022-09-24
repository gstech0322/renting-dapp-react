import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import ComingSoon from './components/ComingSoon/ComingSoon';
import AllCategories from './containers/AllCategories/Index';
import categoryDetail from './containers/CategoryDetail/Index';
import CategoryForm from './containers/CategoryForm/Index';
import ChatPage from './containers/ChatPage/Index';
import FavPage from './containers/FavPage/Index';
// import '~bootstrap-sass/assets/stylesheets/_bootstrap.scss';
//Pages
import Home from './containers/Home/Index';
import ListPage from './containers/ListPage/Index';
import MyAccount from './containers/MyAccount/Index';
import MyListing from './containers/MyListing/Index';
import MyProduct from './containers/MyProduct/Index';
import Product from './containers/Product/Index';
// import {
//   categoryArray,
//   subCategoryArray,
// } from './env.js';
import RentPage from './containers/RentPage/Index';
import SearchedProducts from './containers/SearchedProducts/Index';
import { MapProvider } from './MapState';


function App() {
  return (
    <div className="App">
      <MapProvider>
        <Router>
            <Switch>
              <Route exact path="/" component={Home} />
                <Route exact path="/allCategory" component={AllCategories} />
                <Route exact path="/List" component={ListPage} />
                <Route exact path="/categoryDetail" component={categoryDetail} />
                <Route exact path="/myFav" component={FavPage} />
                <Route exact path="/myChat" component={ChatPage} />
                {/*<Route exact path="/RentList" component={RentalPage} />*/}
                <Route exact path="/MyListing" component={MyListing} />
                <Route exact path="/form" component={CategoryForm} />
                <Route exact path="/search" component={SearchedProducts} />
                <Route exact path="/ComingSoon" component={ComingSoon} />
                <Route exact path="/RentPage" component={RentPage} />
                <Route exact path="/MyAccount" component={MyAccount} />
                <Route path="/Product/:address" exact component={Product} />
                <Route path="/MyProduct/:address" exact component={MyProduct} />


                {/* category and subcategory routing */}
                {/* < Route path = "/List/:category"
        exact render = {
          props => {
            let categoryWordArray = [];
            for (const categoryWord of props.match.params.category.split('-')) {
              categoryWordArray.push(categoryWord.charAt(0).toUpperCase() + categoryWord.slice(1));
            }
            console.log(categoryWordArray, categoryArray);
            const categoryId = categoryArray.indexOf(categoryWordArray.join(' '));

            return <AllCategories categoryId = {
              categoryId
            }
            />; */}
          {/* }
        }
        />
        < Route path = "/List/:category/:subCategory"
        exact render = {
          props => {
            let categoryWordArray = [];
            for (const categoryWord of props.match.params.category.split('-')) {
              categoryWordArray.push(categoryWord.charAt(0).toUpperCase() + categoryWord.slice(1));
            }
            const categoryId = categoryArray.indexOf(categoryWordArray.join(' '));

            let subCategoryWordArray = [];
            for (const subCategoryWord of props.match.params.subCategory.split('-')) {
              subCategoryWordArray.push(subCategoryWord.charAt(0).toUpperCase() + subCategoryWord.slice(1))
            }
            const subCategoryId = subCategoryArray[categoryId].indexOf(subCategoryWordArray.join(' '));
            return <AllCategories categoryId = {
              categoryId
            }
            subCategoryId = {
              subCategoryId
            }
            />;
          }
        }
        /> */}
          </Switch>
        </Router>
      </MapProvider>
    </div>
    
  );
}

export default App;