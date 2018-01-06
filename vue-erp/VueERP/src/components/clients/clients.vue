<template>
    <div>
        <datagrid api="Employee/Index" :tools="tools"></datagrid>
    </div>
</template>

<script type="text/javascript">
    import datagrid from '../datagrid/datagrid.vue'
    import router from '../../router'

    export default {
        components: {
            datagrid
        },
        data(){
            return {
                tools: {
                    add: {
                        text: '添加客户',
                        event: function(){
                            router.push({name: 'client'})
                        }
                    }
                }
            }
        }
    }
</script>