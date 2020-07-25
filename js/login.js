const apiPath = 'https://course-ec-api.hexschool.io/api/';
const uuid = '5859a3a4-28fe-452b-819d-f09834d47d87';
const app = new Vue({
    el: '#app',
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            isProcessing: false,
        };
    },
    methods: {
        login() {
            // const apiPath = 'https://course-ec-api.hexschool.io/api/';
            const api = `${apiPath}auth/login`;
            this.isProcessing = true;
            axios.post(api, this.user).then((response) => {
                this.isProcessing = false;
                const token = response.data.token;
                const expired = response.data.expired;
                document.cookie = `token=${token}; expires=${new Date(expired * 1000)}; path=/`;
                window.location = 'products.html'; // 登入成功跳到 products.html
            }).catch((error) => {
                console.log(error);
            });
        },
        // password 輸入後按 enter 也可以 login
        enterKey(e) {
            if(e.keyCode === 13) { // enter 的 keycode 是 13
                signin();
            }
        },
        getData() {
            this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            // const apiPath = 'https://course-ec-api.hexschool.io/api/';
            const apiGet = `${apiPath}${uuid}/admin/ec/products`;
            axios.defaults.headers.common['Authorization'] =  `Bearer ${this.token}`;
            axios.get(apiGet).then((response) => {
                this.products = response.data.data;
                this.pagination = response.data.meta.pagination;
            }).catch((error) => {
                console.log(error);
            });
        },
    
    },
});



