export default {
    template:`<div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
        <div class="modal-header  bg-dark py-4">
            <h3 class="modal-title text-light" id="exampleModalLabel">新增產品</h3>
            <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="container">
                <div class="row d-flex justify-content-between">
                    <div class="creatImg col-md-4">
                        <h4 class="mb-3">輸入圖片網址</h4>
                        <input type="text" v-model="temProduct.imageUrl[0]"
                            class="px-3 py-1 mb-5 w-100" placeholder="請輸入圖片連結">
                        <img class="img-fluid mb-3" :src="temProduct.imageUrl[0]" alt="">
                        <input type="text" v-model="temProduct.imageUrl[1]"
                            class="px-3 py-1 mb-5 w-100" placeholder="請輸入圖片連結">
                        <img class="img-fluid" :src="temProduct.imageUrl[1]" alt="">
                    </div>
                    <div class="creatContent col-md-8">
                        <h4 class="mb-3">標題</h4>
                        <input type="text" v-model="temProduct.title" class="px-3 py-1 w-100"
                            placeholder="請輸入標題">
                        <div class="d-flex mt-3">
                            <div class="mr-3">
                                <h4 class="mb-3">分類</h4>
                                <input type="text" v-model="temProduct.category"
                                    class="px-3 py-1 w-100" placeholder="請輸入分類">
                            </div>
                            <div>
                                <h4 class="mb-3">輸入單位</h4>
                                <input type="text" v-model="temProduct.unit" class="px-3 py-1 w-100"
                                    placeholder="請輸入單位">
                            </div>
                        </div>
                        <div class="d-flex mt-3">
                            <div class="mr-3">
                                <h4 class="mb-3">原價</h4>
                                <input type="text" v-model="temProduct.origin_price"
                                    class="px-3 py-1 w-100" placeholder="請輸入原價">
                            </div>
                            <div>
                                <h4 class="mb-3">售價</h4>
                                <input type="text" v-model="temProduct.price"
                                    class="px-3 py-1 w-100" placeholder="請輸入售價">
                            </div>
                        </div>
                        <hr class="mt-3">
                        <h4 class="mt-3">產品描述</h4>
                        <textarea name="" id="" v-model="temProduct.description"
                            placeholder="請輸入產品描述" cols="70" rows="5" class="pt-3 pl-3"></textarea>
                        <h4 class="mt-3">說明內容</h4>
                        <textarea name="" id="" v-model="temProduct.content" placeholder="請輸入說明內容"
                            cols="70" rows="5" class="pt-3 pl-3"></textarea>
                        <br>
                        <input type="checkbox" class="mt-3" id="enabled"
                            v-model="temProduct.enabled"></input>
                        <label for="enabled">是否啟用</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger py-2 px-5" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-info py-2 px-5" @click="updateProduct">確認</button>
        </div>
    </div>
</div>
    `,
    data() {
        return{
            
        }
    },
    props:['temProduct','api','isNew'],
    methods: {
        updateProduct(){
            // 新增
            let url = `${this.api.path}${this.api.uuid}/admin/ec/product`;
            let httpMethod = 'post';
            // 編輯 如果不是新增就改用 patch
            if (!this.isNew) { 
                url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.temProduct.id}`;
                httpMethod = 'patch';
            }
            axios[httpMethod](url, this.temProduct)
                .then(() => {
                    $('#productModal').modal('hide');
                    this.$emit('update')
                })
                .catch(err => {
                    console.log(err.response);
                })
        }
    }
}