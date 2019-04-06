<template>
<div class="active">
    <h1>无人车订单信息</h1>
    <div class="top">
        <Button type="primary" @click="refresh" icon="refresh">刷新</Button>
        <Input v-model="value1" icon="ios-search" style="width: 130px;margin-left:10px;" @on-enter="search()"/>
    </div>
        <Table :columns="columns" :data="data" stripe :loading="tableLoading"></Table>
        <Page :total="total" :current="query.page" :page-size="query.rows" @on-change="search" show-total show-sizer show-elevator @on-page-size-change="pageSizeChangeHandler" placement="top" class="page">
        </Page>

    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: '',
            add: {
                open: false
            },
            modalEdit: {
                open: false
            },
            params: {},
            tableLoading: true,
            total: 0,
            query: {
                page: 1,
                rows: 10,
                status: 1 //0.待处理  1.进行中  2.已完成
            },
            columns: [{
                    key: 'orderNumber',
                    title: ' 订单编号'
                },
                {
                    key: 'consignee',
                    title: '收货人'
                },
                {
                    key: 'contact',
                    title: '联系方式',
                    width:130
                },
                {
                    key: 'shippingAddress',
                    title: '发货地址',
                    width:160
                },
                {
                    key: 'receivingAddress',
                    title: ' 收货地址'
                },
                {
                    key: 'responsible',
                    title: '负责人'
                },
                {
                    key: 'servicePhone',
                    title: '客服电话'
                },
                {
                    key: 'vehicleNumber',
                    title: '车辆编号'
                },
                {
                    key: 'pickNumber',
                    title: ' 取件号'
                },
                {
                    key: 'lineArrangement',
                    title: '范围安排'
                },

                {
                    key: 'orderMoney',
                    title: '金额(元)'
                }
            ],
            data: [],
            lineList: []
        }
    },
    methods: {
        search(p) {
            let req = {
                page: p ? p : this.query.page,
                rows: this.query.rows,
                orderNumber: this.value1,
                status: this.query.status
            }
            this.query.page = p ? p : this.query.page;
            this.$http.getOrder(req)
                .then(res => {
                    if (res.data.rows.length == 0) {
                        if (this.query.page > 1) {
                            this.query.page = this.query.page - 1;
                            if (this.query.page > 0) {
                                this.search()
                            }
                        }
                    }
                    this.tableLoading = false;
                    if (res.data.success) {
                        this.data = res.data.rows.map(el => {
                            return {
                                id:el.id,
                                orderNumber: el.orderNumber,
                                consignee: el.consignee,
                                contact: el.contact,
                                shippingAddress: el.shippingAddress,
                                receivingAddress: el.receivingAddress,
                                orderTime: el.orderTime.slice(0, 10),
                                responsible: el.responsible,
                                servicePhone: el.servicePhone,
                                vehicleNumber: el.vehicleNumber,
                                pickNumber: el.pickNumber,
                                // lineArrangement: el.lineArrangement,
                                lineArrangement: this.lineList.filter(ol => Number(ol.id) === Number(el.lineArrangementId))[0].lineArrangement,
                                orderMoney: el.orderMoney
                            }
                        })
                    } else {
                        this.data = []
                    }
                    this.total = res.data.records;
                })
        },
        pageSizeChangeHandler(t) {
            this.query.rows = t;
            this.query.page = 1;
            this.search();
        },
        refresh() {
            this.value1 = ''
            this.search()
        },
        // 获取范围
        getLine() {
            this.$http.getLine()
                .then(res => {
                    if (res.data.success) {
                        this.lineList = res.data.result;
                    }
                })
        }

    },
    mounted() {
        this.getLine()
        this.search();
    }
}
</script>

<style lang="less" scoped>
.active {
    .top {
        margin-bottom: 20px;
        text-align: left;
    }
}
</style>
