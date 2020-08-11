<template>
  <div class="container">
    <form v-on:submit.prevent="submitHandler">
      <div class="row">
      <h1>Create</h1>
      <div class="input-field">
          <input v-model="title" id="title" type="text" class="validate" required>
          <label for="title">Title</label>
          <span class="helper-text" data-error="Error"></span>
      </div>
      <div class="input-field">
          <textarea v-bind:class="{ invalid: invalid }" v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Body</label>
          <span class="character-counter">{{description.length}}/2048</span>
      </div>
       <div class="chips" ref="chips"></div>
       <input type="text" ref="datepicker">
       <button class="btn waves-effect waves-light" type="submit">Submit
        <i class="material-icons right">send</i>
       </button>
      </div>
    </form>
  </div> 
</template>

<script>

export default {
  name: 'Create',
  data(){
    return{
      description: '',
      title: '',
      invalid: false,
      chips: null,
      date: null
    }
  },
  components: {
  },
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Tags'
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
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
        const task = {
            title: this.title,
            description: this.description,
            id: Date.now(),
            chips: this.chips.chipsData,
            date: this.date.date,
            status: 'active'
        };
        this.$store.dispatch('createTask', task)
        this.$router.push('/list')
    }
  },
  destroyed(){
      if (this.date && this.date.destroy){
          this.date.destroy()
      }
      if (this.chips && this.chips.destroy){
          this.chips.destroy()
      }
  }
}
</script>
