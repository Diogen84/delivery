import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Index } from './components/front/indexPage';
import { CategoryList } from './components/admin/categoryList';
import { CategoryDetail } from './components/admin/categoryDetail';
import { ProductList } from './components/admin/productList';
import { ProductDetail } from './components/admin/productDetail';
import { CategoryListPage } from './components/front/categoryListPage';
import { ProductListPage } from './components/front/productListPage';
import { ProductDetailPage } from './components/front/productDetailPage';
import { CartPage } from './components/front/cartPage';
import { CheckoutPage } from './components/front/checkoutPage';
import { OrderList } from './components/admin/orderList';

const routes: Routes = [
    //front
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: Index },
    { path: 'categories', component: CategoryListPage },
    { path: 'categories/:id', component: ProductListPage },
    { path: 'products/:id', component: ProductDetailPage },
    { path: 'cart', component: CartPage },
    { path: 'checkout', component: CheckoutPage },

    //admin
    { path: 'admin/categories', component: CategoryList },
    { path: 'admin/categories/:id', component: CategoryDetail },
    { path: 'admin/products', component: ProductList },
    { path: 'admin/products/:id', component: ProductDetail },
    { path: 'admin/orderList', component: OrderList }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}