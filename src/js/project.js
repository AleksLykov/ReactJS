import { Developer } from './module'

const dev = new Developer()

console.log(dev.getName())
dev.setName('Aleks')
console.log(dev.getName())