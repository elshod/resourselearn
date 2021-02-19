<template>
  <div id="app">
    <h1>New person</h1>
    <button @click="isActive = false">Persons</button>
    <button @click="isActive = true">Cars</button>
    <hr>

    <div v-show="!isActive">
      <h1>Persons</h1>
      <input type="text" v-model="searchPerson" placeholder="search">
      <hr>
      <input type="text" v-model="title" placeholder="Title">
      <input type="text" v-model="age" placeholder="Age">
      <button @click="add" v-show="!isPerson">Add</button>
      <button @click="saveEdit(editIdPerson,editIndexPerson)" v-show="isPerson">Save</button>
      <hr>
      <table border="1" width="100%" cellspacing="0">
        <tr v-for="(person,index) of filteredPersons" :key="index">
          <td>{{index+1}}</td>
          <td>{{person.title}}</td>
          <td>{{person.age}}</td>
          <td><button @click="del(person.id,index)">Delete</button></td>
          <td><button @click="edit(index)">Edit</button></td>
        </tr>
      </table>
    </div>
    <div v-show="isActive">
      <h1>Cars</h1>
      <input type="text" v-model="model" placeholder="Model">
      <input type="text" v-model="color" placeholder="Color">
      <button @click="addCar">Add</button>
      <hr>
      <table border="1" width="100%" cellspacing="0">
        <tr v-for="(car,index) of cars" :key="index">
          <td>{{car.id}}</td>
          <td>{{car.model}}</td>
          <td>{{car.color}}</td>
          <td><button>Delete</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
    return{
      searchPerson:'',
      color: '',
      model: '',
      isActive: false,
      title: '',
      age: 0,
      persons: [],
      cars: [],
      editIdPerson: 0,
      editIndexPerson: 0,
      isPerson: false
    }
  },
  computed: {
    filteredPersons(){
      return this.persons.filter(item => {
        return item.title.toLowerCase().indexOf(this.searchPerson.toLowerCase()) !== -1 || item.age.indexOf(this.searchPerson) !== -1
      })
    }
  },
  // CRUD ---- Create Read Update Delete
  methods: {
    
    
    addCar(){
      const car = {
        model: this.model,
        color: this.color
      }
      this.model = ''
      this.color = ''
      this.$http.post('http://localhost:3000/cars',car)
        .then(response => {return response.json()})
        .then(newCar => { this.cars.push(newCar) })
    },
    add(){
      const person = {
        title: this.title,
        age:   this.age
      }
      this.title = ''
      this.age = ''
      this.$http.post('http://localhost:3000/persons',person)
        .then(response => {return response.json()})
        .then(newPerson => { this.persons.push(newPerson) })
    },
    saveEdit(id,index){
      this.persons[index].title = this.title
      this.persons[index].age = this.age 
      this.isPerson = false
      this.title = ''
      this.age = ''
      this.$http.put('http://localhost:3000/persons/'+id,this.persons[index])
    },
    edit(index){
      this.title = this.persons[index].title
      this.age = this.persons[index].age
      this.isPerson = true
      this.editIdPerson = this.persons[index].id
      this.editIndexPerson = index
    },
    del(id,index){
      this.$http.delete('http://localhost:3000/persons/'+id)
      this.persons.splice(index,1)
    },
  },
  created() {
    this.$http.get('http://localhost:3000/persons')
        .then(response => {return response.json()})
        .then(allPerson => { this.persons = allPerson })


    this.$http.get('http://localhost:3000/cars')
        .then(response => {return response.json()})
        .then(allCars => { this.cars = allCars })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
