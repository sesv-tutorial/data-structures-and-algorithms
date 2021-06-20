// initialize

// object style
const map1 = { // map name to super heros
  'Tony Stark': 'Iron Man',
  'Clark Kent': 'Superman',
}

// Map class style
const map2 = new Map() // map name to super superheroines
map2.set('Diana Prince', 'Wonder Woman')
map2.set('Wanda Maximoff', 'Scarlet Witch')

// print out, see how data looks like
console.log(map1)
// { 'Tony Stark': 'Iron Man', 'Clark Kent': 'Superman' }

console.log(map2)
// Map {
//   'Diana Prince' => 'Wonder Woman',
//   'Wanda Maximoff' => 'Scarlet Witch'
// }

// insert
map1['Carol Danvers'] = 'Captain Marvel' // object style
map2.set('Bruce Banner', 'The Hulk') // Map class style

console.log(map1)
// {
//   'Tony Stark': 'Iron Man',
//   'Clark Kent': 'Superman',
//   'Carol Danvers': 'Captain Marvel'
// }

console.log(map2)
// Map {
//   'Diana Prince' => 'Wonder Woman',
//   'Wanda Maximoff' => 'Scarlet Witch',
//   'Bruce Banner' => 'The Hulk'
// }

// delete
delete map1['Tony Stark'] // object style
map2.delete('Diana Prince') // Map class style

console.log(map1)
// { 'Clark Kent': 'Superman', 'Carol Danvers': 'Captain Marvel' }

console.log(map2)
// Map {
//   'Wanda Maximoff' => 'Scarlet Witch',
//   'Bruce Banner' => 'The Hulk'
// }

// search
// object style
console.log(map1['Clark Kent']) // Superman

// Map class style
console.log(map2.get('Wanda Maximoff')) // Scarlet Witch