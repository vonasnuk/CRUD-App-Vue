<template>
    <div>
        <h1>List</h1>
        <hr>
        <table v-if="tasks.length">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Open</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, idx) in tasks" :key="task.id">
                    <td>{{idx + 1}}</td>
                    <td>{{task.title}}</td>
                    <td class="td-description-container"><div class="text-description">{{task.description}}</div></td>
                    <td>{{new Date(task.date).toLocaleDateString()}}</td>
                    <td class="task-status" ref='taskStatus'>{{task.status}}</td>
                    <td>
                        <router-link tag="button" class="btn btn-small" :to="'/task/' + task.id">
                            Open
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>No tasks</p>
    </div>
</template>
    
<script>
    export default{
        computed:{
            tasks(){
                return this.$store.getters.getTasks
            }
        },
        mounted(){
            for(let i = 0; i < this.$refs.taskStatus.length; i++){
                if(this.$refs.taskStatus[i].innerText === 'completed'){
                    this.$refs.taskStatus[i].classList.add("completed");
                }
                else if (this.$refs.taskStatus[i].innerText === 'active'){
                    this.$refs.taskStatus[i].classList.add("active");
                }
                
            }

        }
    }
</script>

<style>
    .text-description{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .td-description-container{
        max-width: 400px;
    }
    .task-status{
        color: grey;
    }
    .completed{
        color: green;
    }
    .active{
        color: orange;
    }
</style> 