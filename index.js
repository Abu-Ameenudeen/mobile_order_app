import { menuArray } from './data.js'

const menuItemsArea = document.getElementById('menu-items-area')

function renderMenu() {
    const menuHtml = menuArray.map( (menu) => {
         return `
         <div class="img-text-btn"> 
            <div class="img-n-text"> 
                <img src="./images/${menu.img}" class="item-img" alt="${menu.name} image"> 
                <div class="menu-discrptn"> 
                    <h2>${menu.name}</h2> 
                    <p class="ingredients">${menu.ingredients}</p> 
                    <h3>$${menu.price}</h3> 
                </div> 
            </div> 
            <button class="add-btn" data-id="${menu.id}">+</button> 
        </div> 
        ` 
    }
    ).join('') 
    
    menuItemsArea.innerHTML = menuHtml  
}

renderMenu()