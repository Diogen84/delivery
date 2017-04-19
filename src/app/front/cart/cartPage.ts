import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'div.cart-block',
    template:`<div class="cart">
        <div class="cart-picture">
            <img src="images/gallery1.png" alt="" />
        </div>
        <div class="cart-holder">
            <div class="cart-related">
                <table class="cart-table">
                    <tr class="title-row">
                        <td></td>
                        <td colspan="5" class="cart-table-description"><h3>Product title</h3></td>
                    </tr>
                    <tr>
                        <td class="cart-table-img">
                            <img src="images/product-reference1.png" alt="" />
                        </td>
                        <td class="cart-table-description">
                            <ul>
                                <li>ID: 9234581</li>
                                <li>Weight: 10kg</li>
                                <li>Category: category1</li>
                                <li>Price: 25.00$</li>
                            </ul>
                        </td>
                        <td class="cart-table-description">
                            <p>Lorem ipsum dolor site amet Lorem ipsum dolor site amet Lorem ipsum dolor site amet Lorem ipsum dolor site amet</p>
                        </td>
                        <td class="cart-table-quantity">
                            <input class="quantity" type="number" value="1" />
                        </td>
                        <td class="cart-table-price">
                            <span>20.00$</span>
                        </td>
                        <td class="cart-table-options">
                            <ul>
                                <li><a href="#">Refresh</a></li>
                                <li><a href="#">Delete</a></li>
                            </ul>
                        </td>
                    </tr>
                    <tr class="title-row">
                        <td></td>
                        <td colspan="5" class="cart-table-description"><h3>Product title</h3></td>
                    </tr>
                    <tr>
                        <td class="cart-table-img">
                            <img src="images/product-reference1.png" alt="" />
                        </td>
                        <td class="cart-table-description">
                            <ul>
                                <li>ID: 9234581</li>
                                <li>Weight: 10kg</li>
                                <li>Category: category1</li>
                                <li>Price: 25.00$</li>
                            </ul>
                        </td>
                        <td class="cart-table-description">
                            <p>Lorem ipsum dolor site amet Lorem ipsum dolor site amet Lorem ipsum dolor site amet Lorem ipsum dolor site amet</p>
                        </td>
                        <td class="cart-table-quantity">
                            <input class="quantity" type="number" value="1" />
                        </td>
                        <td class="cart-table-price">
                            <span>20.00$</span>
                        </td>
                        <td class="cart-table-options">
                            <ul>
                                <li><a href="#">Refresh</a></li>
                                <li><a href="#">Delete</a></li>
                            </ul>
                        </td>
                    </tr>
                    <tr class="title-row">
                        <td></td>
                        <td colspan="5" class="cart-table-description"><h3>Product title</h3></td>
                    </tr>
                    <tr>
                        <td class="cart-table-img">
                            <img src="images/product-reference1.png" alt="" />
                        </td>
                        <td class="cart-table-description">
                            <ul>
                                <li>ID: 9234581</li>
                                <li>Weight: 10kg</li>
                                <li>Category: category1</li>
                                <li>Price: 25.00$</li>
                            </ul>
                        </td>
                        <td class="cart-table-description">
                            <p>Lorem ipsum dolor site amet Lorem ipsum dolor site amet Lorem ipsum dolor site amet Lorem ipsum dolor site amet</p>
                        </td>
                        <td class="cart-table-quantity">
                            <input class="quantity" type="number" value="1" />
                        </td>
                        <td class="cart-table-price">
                            <span>20.00$</span>
                        </td>
                        <td class="cart-table-options">
                            <ul>
                                <li><a href="#">Refresh</a></li>
                                <li><a href="#">Delete</a></li>
                            </ul>
                        </td>
                    </tr>
                    <tr class="total">
                        <td colspan="4" class="price-title">Total:</td>
                        <td class="price">20.00$</td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>`
})

export class CartPage implements OnInit {
    ngOnInit(): void {
        console.log(1);
    }
}