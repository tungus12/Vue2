Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
    template: `
   <div class="product">
    
        <div class="product-image">
      <img alt="#" :src="image" :alt="altText">
    </div>

        <div class="product-info">
        
            <h1>{{ product }}</h1>
            <a :href="link" target="_blank">More products like this</a>
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <p v-if="inStock">In stock</p>
            <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
            <p>{{ sale }}</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <span v-if="onSale">On Sale!</span>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div
       class="color-box"
       v-for="(variant, index) in variants"
       :key="variant.variantId"
       :style="{ backgroundColor:variant.variantColor }"
    @mouseover="updateProduct(index)">
</div>
            <ul>
                <li v-for="sizes in sizes"> {{ sizes }}</li>
            </ul>
           
            <p>Shipping: {{ shipping }}</p>
            
            

            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
 >Add to cart</button>
            <button v-on:click="removeFromCart">Remove from cart</button>

            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>
            <div :class="classObject"></div>
            <div :class="[activeClass, errorClass]"></div>


        </div>

    </div>
 `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            description: 'A pair of warm fuzzy socks',
            selectedVariant: 0,
            altText: "A pair of socks",
            link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            inStock: false,
            inventory: 11,
            onSale: true,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './img/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './img/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0
                },

            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0,
        }
    },
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },

        removeFromCart() {
            this.cart -= 1
        }
    },

    computed: {
    title() {
        return this.brand + ' ' + this.product;
    },
    image() {
        return this.variants[this.selectedVariant].variantImage;
    },
    inStock(){
        return this.variants[this.selectedVariant].variantQuantity
    },
    sale() {
        if (this.onSale) {
            return this.brand + ' ' + this.product + ' are on sale!'
        }
        return  this.brand + ' ' + this.product + ' are not on sale'
    },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }

    }
})



let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})


