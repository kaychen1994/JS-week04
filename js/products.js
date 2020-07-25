import pagination from './pagination.js';
import modal from './modal.js';
import delModal from './delModal.js';
Vue.component('pagination',pagination);
Vue.component('modal',modal);
Vue.component('delModal',delModal);

const product = new Vue({
    el: "#product",
    data: {
        api:{
            uuid: '5859a3a4-28fe-452b-819d-f09834d47d87',
            path: 'https://course-ec-api.hexschool.io/api/',
        },
        token: "",
        isNew: false,
        products: [],
        pagination: {},
        temProduct: {
            imageUrl:[]
        },
    },
    methods: {
        // 取得產品資料
        getProducts(num = 1) { // 當 num 為 undefined 的時候代上 1 ，將 num 預設為 1
            const apiUrl = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`;
            axios.get(apiUrl).then(res => {
                    console.log(res);
                    this.products = res.data.data;
                    this.pagination  = res.data.meta.pagination;

                    if(this.temProduct.id) {
                        this.temProduct = {
                            imageUrl:[]
                        };
                        $('#productModal').modal('hide'); // 更新結束後關閉 modal
                    }
                });
        },
        openModal(isNew, item) {
            switch (isNew) {
                case 'new': // 新增
                    this.temProduct = {
                        imageUrl: [],
                    };
                    this.isNew = true;  
                    $('#productModal').modal('show'); 
                    break;
                case 'edit': // 編輯
                    this.isNew = false;
                    this.temProduct = Object.assign({}, item); // 淺拷貝
                    // 取得單一筆資料用 id
                    const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
                    axios.get(url)
                        .then(res => {
                            console.log(res);
                            this.temProduct = res.data.data;
                            $('#productModal').modal('show');
                        })
                        .catch(err => {
                            console.log(err.response);
                        });
                    
                    break;
                case 'delete': // 刪除
                    this.temProduct = Object.assign({}, item); // 淺拷貝
                    $('#delProductModal').modal('show');
                    break;
                default:
                    break;
            }
        },
        // 登出，清除 cookie
        logout(){
            document.cookie = `token=; expires=; path=/`;
            window.location = "login.html";
        },
    },
    created() {
        // 帶出 token ， 沒有 token 無法取資料
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 作為預設值，每次發送都會把 token 帶上
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        // 防止直接輸入網址進入，一定要 login
        if(this.token === "") {
            window.location = "login.html";
        }
        this.getProducts(); //先運行 getProducts
    },
});