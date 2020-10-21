import Apple from "./Apple.js";

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.generateApples = this.generateApples.bind(this);
        this.pickApple = this.pickApple.bind(this);
        this.eatApple = this.eatApple.bind(this);
        this.deleteApple = this.deleteApple.bind(this);
        this.markAsRotten = this.markAsRotten.bind(this);
        this.state = {
            apples: [],
            isLoaded: false
        };
    }

    generateApples(e) {
        e.preventDefault();
        fetch('/apple/generate', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        }).then(res => res.json()).then(result => {
            this.setState({
                apples: result.apples
            });
        });
    }

    pickApple(id, dropped_at) {
        let apples = this.state.apples;
        let i = apples.findIndex(apple => apple.id === id);
        apples[i].status = 1;
        apples[i].dropped_at = dropped_at;
        this.setState({ apples });
    }

    eatApple(id, percent) {
        //проверка даты, когда упало, с текущим, если успешно - то пошли дальше
        let apples = this.state.apples;
        let i = apples.findIndex(apple => apple.id === id);
        apples[i].percent = parseFloat(apples[i].percent) + percent * 100;
        //если больше 100процентов, то удаляем яблоко из стейта
        if (apples[i].percent >= 100) {
            console.log(123);
            apples.splice(i, 1);
        }
        this.setState({ apples });
    }

    deleteApple(id) {
        let apples = this.state.apples;
        let i = apples.findIndex(apple => apple.id === id);
        apples.splice(i, 1);
        this.setState({ apples });
    }

    markAsRotten(id) {
        let apples = this.state.apples;
        let i = apples.findIndex(apple => apple.id === id);
        apples[i].status = '2';
        this.setState({ apples });
    }

    componentDidMount() {
        fetch('/apple/get-apples').then(res => res.json()).then(result => {
            this.setState({
                apples: result.apples,
                isLoaded: true
            });
        });
    }

    render() {
        let apples = this.state.apples;

        console.log(apples);
        if (this.state.isLoaded) {
            if (apples.length === 0) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'a',
                        { href: '', onClick: this.generateApples, style: {
                                display: "flex",
                                justifyContent: "center"
                            } },
                        '\u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u044F\u0431\u043B\u043E\u043A\u0438'
                    )
                );
            } else {
                return React.createElement(
                    'div',
                    { style: { 'display': 'flex', 'justifyContent': 'space-between' } },
                    apples.map(apple => {
                        return React.createElement(Apple, {
                            params: apple,
                            key: apple.id,
                            pickApple: this.pickApple,
                            eatApple: this.eatApple,
                            deleteApple: this.deleteApple,
                            markAsRotten: this.markAsRotten
                        });
                    })
                );
            }
        } else {
            return React.createElement(
                'div',
                null,
                '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..'
            );
        }
    }
}