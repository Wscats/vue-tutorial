<template>
    <div>
        <div class="dk-form">
            <form ref="clientForm" role="form" class="form-horizontal ng-pristine ng-valid">
                <div class="form-group">
                    <div class="col-sm-1">
                        <span class="col-sm-12 control-label">姓名</span>
                    </div>
                    <div class="col-sm-2">
                        <div class="dk-form-element">
                            <input type="text" name="name" v-model="dataform.name" class="form-control required">
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <span class="col-sm-12 control-label">性别</span>
                    </div>
                    <div class="col-sm-2">
                        <div class="dk-form-element">
                            <select v-model="dataform.gender"  name="gender" class="form-control required">
                                <option value="男">男</option>
                                <option value="女">女</option>
                            </select>
                        </div>
                    </div>     
                    <div class="col-sm-1">
                        <span class="col-sm-12 control-label">电话</span>
                    </div>
                    <div class="col-sm-2">
                        <div class="dk-form-element">
                            <input type="text" name="tel" v-model="dataform.tel" class="form-control required">
                        </div>
                    </div>                                     
                </div>  
                <div class="form-group">
                    <div class="col-sm-1">
                        <span class="col-sm-12 control-label">出生日期</span>
                    </div>
                    <div class="col-sm-2">
                        <div class="dk-form-element">
                            <input v-datepicker type="text" name="birthday" data-model="dataform.birthday" v-model="dataform.birthday" class="date-picker  form-control" data-date-format="yyyy-mm-dd">
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <span class="col-sm-12 control-label">证件号码</span>
                    </div>
                    <div class="col-sm-2">
                        <div class="dk-form-element">
                            <input type="text" name="identityno" v-model="dataform.identityno" class="form-control required">
                        </div>
                    </div> 
                    <div class="col-sm-1">
                        <span class="col-sm-12 control-label">入职时间</span>
                    </div>
                    <div class="col-sm-2">
                        <div class="dk-form-element">
                            <input v-datepicker type="text" data-date-format="yyyy-mm-dd" name="Inductiontime" data-model="dataform.Inductiontime" v-model="dataform.Inductiontime" class="date-picker  form-control">
                        </div>
                    </div>                        
                                  
                </div>
                <div class="form-group">
                    <div class="col-sm-1">
                        <span class="col-sm-12 control-label">地址</span>
                    </div>
                    <div class="col-sm-5">
                        <div class="dk-form-element">
                            <input type="text" name="address" v-model="dataform.address" class="form-control required">
                        </div>
                    </div>   
                </div>                                
            </form>
        </div>
    </div>
</template>

<script type="text/javascript">
    import router from '../../router'
    import http from '../../utils/HttpClient'
    import $ from 'jquery'

    export default {
        data(){
            return {
                dataform: {},
            }
        },
        created(){
            // this.$parent.$emit('dk','hehe')
            var self = this;
            var tools = {
                add: {
                    text: '保存',
                    event: () => {
                        if(!$(this.$refs.clientForm).valid()){
                            return false;
                        }
                        http.post('Employee/Save', self.dataform)
                        .then(response => {
                            if(response.status){
                                $.alert('保存成功!', function(){
                                    router.push({name: 'clients'});
                                })
                            } else {
                                $.alert(response.msg);
                            }
                        })
                    },
                },
                back: {
                    text: '返回',
                    class: 'btn-goback',
                    event: () => {
                        router.push({name: 'clients'})
                    }
                }
            }
            this.$parent.addTool(tools);
        }
    }
</script>