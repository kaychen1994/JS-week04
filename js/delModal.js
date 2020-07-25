export default {
    template: `<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header bg-danger">
            <h3 class="modal-title text-light" id="staticBackdropLabel">刪除商品</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p class="fz-20">是否要將 <span class="text-danger">{{ temProduct.title }}</span> 刪除?</p>
            <img :src="temProduct.imageUrl" alt="" class="mb-3">
            <p class="fz-20 d-flex align-items-center">
                <span class="material-icons text-danger mr-3">
                    error_outline
                </span>
                <span>刪除後就無法復原 !!!</span>
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary"
                data-dismiss="modal">取消刪除</button>
            <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
        </div>
    </div>
</div>`,
    data() {
        return {}
    },
    props: ['temProduct', 'api'],
    methods: {
        delProduct() {
            let delUrl = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.temProduct.id}`;
            axios.delete(delUrl,this.temProduct)
                .then(res => {
                    console.log(res);
                    $('#delProductModal').modal('hide');
                    this.$emit('update');
                })
        }
    }
}