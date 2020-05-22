require('../src/db/mongoose')
const Mixtape = require('../src/models/mixtape')

// User.findByIdAndUpdate("5ec56ee23ddbe1f8d217fa0b", { username: "CharlesBarkley"})
// .then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 22})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// Mixtape.findByIdAndDelete("5ec7d3d4d15dc94c63420fb4")
// .then((mixtape) => {
//     console.log(mixtape)
//     return Mixtape.estimatedDocumentCount()
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateDescriptionAndCount = async (id, description) => {
    const mixtape = await Mixtape.findByIdAndUpdate(id, { description })
    const count = await Mixtape.countDocuments({ description })
    return count
}

updateDescriptionAndCount("5ec5706e83bc61f986bab021", "New!!!").then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

// to promise chain, return another promise

