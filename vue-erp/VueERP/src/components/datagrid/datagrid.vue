<template>
    <div>
        <div class="dk-toolbar dk-grid-toolbar" :id="toolbar_id" v-if="toolbar">
            <a href="javascript:" class="btn btn-primary btn-sm" v-if="toolList" v-for="(value,key) in toolList" @click="click(value)">{{value.text ? value.text : key}}</a>
        </div>
        <div class="dk-datagrid-content">
            <table class="table dk-datagrid" v-if="datasource">
                <thead>
                    <tr>
                        <th class="row-first"></th>
                        <th class="row-controller"></th>
                        <th v-for="(key,value) in datasource.rows[0]">{{value}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in datasource.rows" key={{index}}>
                    <td class="row-first">{{index + 1}}</td>
                    <td class="row-controller"></td>
                    <td v-for="(value, key) in item">{{value}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script type="text/javascript">
	import './datagrid.scss'
    import http from '../../utils/HttpClient'
    import $ from 'jquery'

	export default {
		name: 'datagrid',
        props: ['api', 'tools', 'toolbar'],
        components: {
            
        },
		data(){
			return {
                datasource: null,
                toolList: null,
                toolbar_id: 'toobar_' + parseInt(Math.random() * 10000)
            }
		},
        methods: {
            click: function(evt){
                if(evt && evt.event){
                    evt.event()
                }
            }
        },
        created(){
            if(this.api){
                http.get(this.api)
                .then(response => {
                    this.datasource = response.data
                    if(typeof this.datasource.rows == 'string'){
                        this.datasource.rows = JSON.parse(this.datasource.rows);
                    }
                })                
            }
            if(this.tools){
                if(this.toolbar){
                    this.toolList = this.tools
                } else {
                    this.$parent.$parent.addTool(this.tools)
                }
            }  
        }
	}
</script>