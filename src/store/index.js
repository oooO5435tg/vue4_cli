// import { createStore } from 'vuex'

// export default createStore({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })


import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    fio: '',
    email: '',
    password: '',
    user_token: null,
    products: [],
    cartList: [],
    cartItems: [],
    orderList: [],
  },
  getters: {

  },
  mutations: {
    async getProducts(state){
      const {data} = await axios.get('https://jurapro.bhuser.ru/api-shop/products')
          .then(response => state.products = response.data)
          .catch(error =>{console.log(error)})
      state.products = data;
    },
    async registration(state){
      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/signup', {
        fio: state.fio,
        email: state.email,
        password: state.password
      })
      .then(function(response){
        state.user_token = response.data.data.user_token;
        localStorage.token = state.user_token;
        alert('Регистрация прошла успешно');
        if(localStorage.token !== null && localStorage.token !== undefined){
          window.location.href = "/login";
        }
      })
      .catch(error =>{console.log(error)
        alert('Регистрация провалена. Попробуйте еще раз');
      })
    },
    async login(state){
      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/login', {
        email: state.email,
        password: state.password
      })
          .then(function(response){
            state.user_token = response.data.data.user_token;
            localStorage.token = state.user_token;
            alert('Авторизация прошла успешно');
          })
          .catch(error =>{console.log(error)
            alert('Авторизация провалена. Попробуйте еще раз');
          })
      if(localStorage.token !== undefined && localStorage.token !== null){
        window.location.href = "/";
      }
    },
    logout(state){
      state.user_token = null;
      localStorage.clear();
    },
    // addProductToCart(state, product) {
    //   axios.post(`https://jurapro.bhuser.ru/api-shop/cart/${product.id}`)
    //       .then(response => {
    //         state.cartList.push(response.data.data);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    // },
    addProductToCart(state, product) {
      const token = state.user_token;
      if (token) {
        axios.post(`https://jurapro.bhuser.ru/api-shop/cart/${product.id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
            .then(response => {
              state.cartList.push(response.data.data);
            })
            .catch(error => {
              console.log(error);
            });
      } else {
        console.log('Пользователь не авторизован');
      }
    },
  },
  actions: {

  },
  modules: {

  },
})