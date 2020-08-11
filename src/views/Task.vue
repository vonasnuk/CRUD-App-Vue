<template>
    <div>
        <div v-if="task">
            <h3>{{task.title}}</h3>
            <hr>
            <div class="row">
                <form v-on:submit.prevent="submitHandler">
                    <h4>Change</h4>
                    <div class="input-field">
                        <textarea v-bind:class="{ invalid: invalid }" v-model="description" id="description" class="materialize-textarea"></textarea>
                        <span class="character-counter">{{description.length}}/2048</span>
                    </div>
                     <div class="chips" ref="chips"></div>
                    <input type="text" ref="datepicker">
                    <button class="btn waves-effect waves-light" type="submit">Upadate</button>
                    <button class="btn pink btn-complete" v-on:click="updateStatus">Complete task</button>
                    <button class="btn red btn-delete" v-on:click="deleteItem">Delete task</button>
                </form>
           </div>
        </div>
        <h2 v-else>Task not found</h2>
    </div>
</template>


<script>
    export default {
        data(){
            return{
            description: '',
            invalid: false,
            chips: null,
            date: null
            }
        },
        mounted() {
            this.description = this.task.description
            this.chips = M.Chips.init(this.$refs.chips, {
            placeholder: 'Tags',
            data: this.task.chips
            })
            this.date = M.Datepicker.init(this.$refs.datepicker, {
            format: 'dd.mm.yyyy',
            defaultDate: new Date(this.task.date),
            setDefaultDate: true
            })
        },
        updated(){
            if (this.description.length > 2048) {
                this.invalid = true
            }
            if (this.description.length <= 2048){
                this.invalid = false
            }
        },
        methods: {
            submitHandler(){
                this.$store.dispatch('updateTask', {
                    description: this.description,
                    date: this.date.date,
                    id: this.task.id
                })
                this.$router.push('/list')

            },
            updateStatus(){
                this.$store.dispatch('updateStatus', this.task.id)
                this.$router.push('/list')
            },
            deleteItem(){
                this.$store.dispatch('deleteItem', this.task.id)
                this.$router.push('/list')
            }
        },
            computed:{
            task(){
                return this.$store.getters.getTaskById(+this.$route.params.id)
            }
        }
    }
</script>

<style>
    .btn-complete{
        float: right;
    }
    .btn-delete{
        margin-left: 20px;
    }
</style>