<script>
import store from "@/store";
export default {
  computed: {
    store() {
      return store
    }
  },
  methods:{
    addToCart(product) {
      this.$store.commit('addProductToCart', product);
    },
  },
  mounted() {
    if (localStorage.token !== undefined && localStorage.token !== null) {
      store.state.user_token = localStorage.token;
    }
    this.$store.commit('getProducts');
  },
}
</script>

<template>
  <h1>Каталог товаров</h1>
  <div id="catalog">
    <div class="products">
      <div class="product_item" v-for="item in this.store.state.products">
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
        <p>{{ item.price }} руб.</p>
        <button class="add_btn" @click="addToCart(item)">В корзину</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#catalog{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.products{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 0.8fr));
  gap: 90px;
}
.product_item{
  width: 100%;
  background-color: #e1e1e1;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.product_item:hover{
  transform: translateY(-5px);
}
.product_item h2{
  margin: 0 0 10px;
}
.product_item p{
  margin: 5px 0;
}
.add_btn{
  width: 200px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.product_item button:hover{
  background-color: #3e8e41;
}

@media screen and (max-width: 1920px) {
  .product_item{
    transform: scale(0.9);
  }
}

@media screen and (max-width: 768px) {
  .products{
    grid-template-columns: 1fr;
  }
}
</style>