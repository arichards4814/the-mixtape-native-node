require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate("5ec56ee23ddbe1f8d217fa0b", { username: "CharlesBarkley"})
// .then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 22})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })



const updateAgeAndCount = async (id, description) => {
    const mixtape = await Mixtape.findByIdAndUpdate(id, { description })
    const count = await Mixtape.countDocuments({ description })
    return count
}

updateAgeAndCount("5ec5706e83bc61f986bab021", "New!!!").then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})



// to promise chain, return another promise

