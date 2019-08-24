let times = 3;
// Функция, принимающая два параметра, одним из которых является коллбэк 
let loop = (tt = 0, callback = null) => {
    if (typeof callback === 'function') {
        for(let i=0; i<=times; i++) callback(tt++); 
    } else console.log('Error!!!')
}
loop(times);
loop(times, (b) => console.log(b));

// =================================  LESSON 1.2 ==========================
let calculateArea = (lengths) => {
    let obj = {}
    lengths = document.querySelector('.input-calc-area').value.split(/(?:,| |[^0-9.])+/).map(x=>+x||x==0?+x:undefined)
    let findFigure = document.querySelector('input[name="figure"]:checked').value
    if(findFigure === 't') {
        obj.area = Math.round(Math.sqrt(((lengths[0]+lengths[1]+lengths[2])/2)*((lengths[0]+lengths[1]+lengths[2])/2-lengths[0])*((lengths[0]+lengths[1]+lengths[2])/2-lengths[1])*((lengths[0]+lengths[1]+lengths[2])/2-lengths[2])))
        obj.figure = 'Треугольник'
        lengths.length = 3
    }
    if(findFigure === 'o') {
        obj.area = Math.round(3.14*lengths[0]*lengths[0])
        obj.figure = 'Окружность'
        lengths.length = 1
    }
    if(findFigure === 'p') {
        obj.area = Math.round(lengths[0]*lengths[1])
        obj.figure = 'Прямоугольник'
        lengths.length = 2
    }
    if(findFigure === 'r') {
        obj.area = Math.round(lengths[2]*(lengths[0]+lengths[1])/2)
        obj.figure = 'Трапеция'
        lengths.length = 3
    }
    obj.input = lengths
    return document.querySelector('.label-rez').innerHTML = `Итоговый объект: ${JSON.stringify(obj)}`
}
let changeArea = () => {
    let prnt = document.querySelector('.type-figure')
    let chld = document.querySelector('.input-calc-area')
    let findFigure = document.querySelector('input[name="figure"]:checked').value
    if(findFigure === 't') prnt.innerText = 'Введите длины трех сторон: '
    if(findFigure === 'o') prnt.innerText = 'Введите радиус окружности: '
    if(findFigure === 'p') prnt.innerText = 'Введите длины и ширину: '
    if(findFigure === 'r') prnt.innerText = 'Введите длины оснований и высоту: '
    prnt.appendChild(chld)
    prnt.insertAdjacentHTML("beforeend", ' (через `,`)')
}
document.querySelectorAll('input[name="figure"]').forEach((item) => {
    item.addEventListener('change', changeArea)})
document.querySelector('.calc-area-start').addEventListener('click', calculateArea)

// =================================  LESSON 1.3 ==========================

class Human {
    constructor (name , age, dateOfBirth) { 
        this.name =(typeof name =='string')? name: 'ошибка ввода данных';
		this.age = (typeof age =='number')?age: 'ошибка ввода данных';
		this.dateOfBirth = (typeof dateOfBirth =='string')? dateOfBirth: 'ошибка ввода данных';
    }
    displayInfo() {
        return `${this.name} : ${this.age} : ${this.dateOfBirth}`;
    }
}

class Employee extends Human {
    constructor(name, age, dateOfBirth, salary, department) {
        super(name, age, dateOfBirth)
        this.salary = (typeof salary=='number') ? salary: 'ошибка ввода данных';
	    this.department = (typeof department =='string') ? department:'ошибка ввода данных';
	}
    displayInfo() {
        return `${super.displayInfo()} :: ${this.salary} :: ${this.department}`
    }
}

class Manager extends Employee {
    constructor(name, age, dateOfBirth, salary, department) {
        super(name, age, dateOfBirth, salary, department)
        this.employees = []
    }
    addDev(...developer) {
        developer.forEach((dev) => dev.manager = this.name)
        this.employees.push(...developer)
    }
    removeDev(...developer) {
        developer.forEach((dev) => this.employees.splice(this.employees.indexOf(dev), 1))
    }
    displayInfo() {
        return `${super.displayInfo()} :: EMPS - ${this.employees}`
    }
}

class Developer extends Employee {
    constructor(name, age, dateOfBirth, salary, department) {
        super(name, age, dateOfBirth, salary, department)
        this.manager = ''
    }
    changeManager(manager) {
        this.manager = manager.name
    }
    displayInfo() {
        return `${super.displayInfo()} :: Manager - ${this.manager}`
    }
}
// ДЕМОНСТРАЦИЯ РАБОТЫ КЛАССОВ
let hh = new Human('Petr', 25, '25/11')
console.log(hh.displayInfo())
let emp = new Employee('Vova', 30, '11/01',  35000, 'police')
console.log(emp.displayInfo())
//Манагеры
let mng1 = new Manager('m1', 22, '22/11', 1000, 'd1')
let mng2 = new Manager('m2', 32, '12/01', 5000, 'd2')
console.log(mng1.displayInfo())
console.log(mng2.displayInfo())
//Разрабы
let dev1 = new Developer('dev1', 26, '01/01', 22000, 'd1')
let dev2 = new Developer('dev2', 27, '01/01', 23000, 'd1')
let dev3 = new Developer('dev3', 28, '01/01', 24000, 'd2')
let dev4 = new Developer('dev4', 29, '01/01', 25000, 'd2')

document.querySelector('.lesson-output').innerHTML+=`Human: `+JSON.stringify(hh)+'<br><br>';
document.querySelector('.lesson-output').innerHTML+=`Employee: `+JSON.stringify(emp)+'<br><br><hr><br>';

mng1.addDev(dev1, dev2);
document.querySelector('.lesson-output').innerHTML+=`Manager 1: `+JSON.stringify(mng1)+'<br><br>';
document.querySelector('.lesson-output').innerHTML+=`Manager 2: `+JSON.stringify(mng2)+'<br><br>';
mng1.removeDev(dev1, dev2);
document.querySelector('.lesson-output').innerHTML+=`Manager 1 (after remove dev's): `+JSON.stringify(mng1)+'<br><br><hr><br>';
console.log(mng1.employees)
document.querySelector('.lesson-output').innerHTML+=`Developer 3: `+JSON.stringify(dev3)+'<br><br>';
dev3.changeManager(mng2)
document.querySelector('.lesson-output').innerHTML+=`Developer 3 (after change manager): `+JSON.stringify(dev3)+'<br><br>';
console.log(dev3.displayInfo())