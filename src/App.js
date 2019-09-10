import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    render() {
        return <div>
            <h1>Первое приложение на ReactJS.</h1>
            <p>Hello, React!!! It's cool!</p>
        </div>
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))