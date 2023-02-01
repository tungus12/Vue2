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

Vue.component('product-review', {
   template: `
   <input v-model="name">
 `,
   data() {
       return {
           name: null,
           review: null,
           rating: null,
           recommend:[],
           errors: []
       }
   }
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
            <p v-else-if="stock <= 10 && stock > 0">Almost sold out!</p>
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
            <button v-on:click="removeToCart">Delete</button>
            

           
            </div>
            <div :class="classObject"></div>
            <div :class="[activeClass, errorClass]"></div>
            <div>
<h2>Reviews</h2>
<p v-if="!reviews.length">There are no reviews yet.</p>
<ul>
  <li v-for="review in reviews">
  <p>{{ review.name }}</p>
  <p>Rating: {{ review.rating }}</p>
  <p>{{ review.review }}</p>
  </li>
  
</ul>

</div>

        </div>
        
        <product-review @review-submitted="addReview"></product-review>
        
    </div>
    
 `,
    data() {
        return {
            product:'sock',
            reviews: [],
            brand: 'Vue Mastery',
            description: 'A pair of warm fuzzy socks',
            selectedVariant: 0,
            altText: "A pair of socks",
            link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
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
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },

        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        removeToCart() {
            this.$emit('remove-to-cart', this.variants[this.selectedVariant].variantId)
        },
        onSubmit() {
            this.errors = []
   if(this.name && this.review && this.rating && this.recommend) {
       let productReview = {
           name: this.name,
           review: this.review,
           rating: this.rating,
           recommend: this.recommend
       }
       this.$emit('review-submitted', productReview)
       this.name = null
       this.review = null
       this.rating = null
       this.recommend = null
   } else {
       if(!this.name) this.errors.push("Name required.")
       if(!this.review) this.errors.push("Review required.")
       if(!this.rating) this.errors.push("Rating required.")
       if(!this.recommend) this.errors.push("Recommendation required.")
   }
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
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeToCart(id) {
            for (let i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
})


