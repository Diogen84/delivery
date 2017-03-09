import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector : '[header-section]',
	template: `
		<header class="header">
		    <div class="row">
		        <div class="holder">
		            <h1 class="logo">
		                <a href="#">Logo</a>
		            </h1>
		            <a href="/" class="navigation-opener" (click)="openClose()"><span>open/close</span></a>
		            <div class="cart">
		                <a href="#">Admin</a>
		                <a href="#">Cart: 1 item(s)</a>
		            </div>
		        </div>
		    </div>
		    <div class="row">
		        <div class="holder">
		            <form class="search">
		                <fieldset>
		                    <input type="text" value="" placeholder="Search" />
		                </fieldset>
		            </form>
		            <ul class="navigation">
		            	<li><a href="#/index">Home</a></li>
		            	<li><a href="#/categories">Categories</a></li>
		            	<li><a href="#/admin/categories">Admin</a></li>
		                <li><a href="/">Menu Item 1</a>
		                    <ul>
		                        <li><a href="/">Sub-item1</a></li>
		                        <li><a href="/">Sub-item2</a></li>
		                        <li><a href="/">Sub-item3</a>
		                            <ul>
		                                <li><a href="/">sub-sub-item1</a></li>
		                                <li><a href="/">sub-sub-item2</a></li>
		                                <li><a href="/">sub-sub-item3</a></li>
		                                <li><a href="">sub-sub-item4</a></li>
		                            </ul>
		                        </li>
		                    </ul>
		                </li>
		                <li class="last"><a href="/">Menu Item 2</a>
		                    <ul>
		                        <li><a href="/">Sub-item1</a></li>
		                        <li><a href="/">Sub-item2</a></li>
		                        <li><a href="/">Sub-item3</a>
		                            <ul>
		                                <li><a href="/">sub-sub-item1</a></li>
		                                <li><a href="/">sub-sub-item2</a></li>
		                                <li><a href="/">sub-sub-item3</a></li>
		                                <li><a href="/">sub-sub-item4</a></li>
		                            </ul>
		                        </li>
		                    </ul>
		                </li>
		            </ul>
		        </div>
		    </div>
		</header>
	`
})

export class HeaderSection {}