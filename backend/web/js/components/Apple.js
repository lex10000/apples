class Apple extends React.Component {
    constructor(props) {
        super(props);
        this.pickApple = this.pickApple.bind(this);
        this.eatApple = this.eatApple.bind(this);
        this.deleteApple = this.deleteApple.bind(this);
        this.markAsRotten = this.markAsRotten.bind(this);
        this.timer = null;
        this.STATUS_NOT_PICKED = 0;
        this.STATUS_PICKED = 1;
        this.STATUS_ROTTEN = 2;
        this.STATUS_EATEN = 10;
        this.STATUS_OVERHEAD = 9;
        this.STATUS_NOT_FOUND = 8;
        this.STATUS_EATED_PARTIAL = 7;
    }

    deleteApple(e) {
        e.preventDefault();
        const id = this.props.params.id;
        fetch('/apple/delete-apple', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ id: this.props.params.id })
        }).then(res => res.json()).then(result => {
            if (result.status === 'success') {
                this.props.deleteApple(id);
            }
        });
    }

    pickApple(e) {
        e.preventDefault();
        fetch('/apple/pick-apple', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ id: this.props.params.id })
        }).then(res => res.json()).then(result => {
            if (result.status === 'success') {
                this.markAsRotten();
                this.props.pickApple(this.props.params.id, result.dropped_at);
            }
        });
    }

    eatApple(e) {
        e.preventDefault();
        let percent = parseFloat(prompt('введите часть яблока, которую хотите съесть, от 0.1 до 1', '0.5'));
        if (!isNaN(percent) && percent >= 0.1 && percent <= 1) {
            fetch('/apple/eat-apple', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ id: this.props.params.id, percent: percent })
            }).then(res => res.json()).then(result => {
                switch (result.status) {
                    case this.STATUS_EATED_PARTIAL:
                        {
                            alert(`Вы съели ${percent} часть`);
                            this.props.eatApple(this.props.params.id, percent);
                            break;
                        }
                    case this.STATUS_NOT_PICKED:
                        {
                            alert('Сначала надо сорвать яблоко, потом уже есть!');
                            break;
                        }
                    case this.STATUS_EATEN:
                        {
                            this.props.eatApple(this.props.params.id, percent);
                            alert('Вы полностью доели яблоко!');
                            break;
                        }
                    case this.STATUS_OVERHEAD:
                        {
                            alert('вы не можете съесть больше, чем осталось, а это ' + (100 - this.props.params.percent) + ' процентов, или ' + (100 - this.props.params.percent) / 100 + ' часть');
                            break;
                        }
                    case this.STATUS_ROTTEN:
                        {
                            alert('Это яблоко испорчено, вы не можете его съесть!');
                        }
                }
            });
        } else {
            alert('вы ввели неправильное значение!');
        }
    }

    markAsRotten() {
        this.timer = setTimeout(() => {
            fetch('/apple/mark-as-rotten', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ id: this.props.params.id })
            }).then(res => res.json()).then(result => {
                if (result.status === 'success') {
                    this.props.markAsRotten(this.props.params.id);
                }
            });
        }, 1000 * 60);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return React.createElement(
            'div',
            { style: { 'padding': '20' } },
            React.createElement(
                'div',
                { style: {
                        width: '50px',
                        height: '50px',
                        backgroundColor: this.props.params.color,
                        borderRadius: '25px',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: 'center'
                    } },
                this.props.params.id
            ),
            this.props.params.status == this.STATUS_NOT_PICKED ? React.createElement(
                'div',
                null,
                React.createElement(
                    'a',
                    { href: '', onClick: this.pickApple },
                    '\u0421\u043E\u0440\u0432\u0430\u0442\u044C'
                )
            ) : React.createElement(
                'div',
                null,
                '\u044F\u0431\u043B\u043E\u043A\u043E \u0441\u043E\u0440\u0432\u0430\u043D\u043E'
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'a',
                    { href: '', onClick: this.eatApple },
                    '\u0421\u044A\u0435\u0441\u0442\u044C'
                )
            ),
            this.props.params.percent == 0 ? React.createElement(
                'div',
                null,
                '\u0412\u044B \u0435\u0449\u0435 \u043D\u0435 \u043A\u0443\u0448\u0430\u043B\u0438 \u044F\u0431\u043B\u043E\u043A\u043E'
            ) : React.createElement(
                'div',
                null,
                '\u0432\u044B \u0443\u0436\u0435 \u0441\u044A\u0435\u043B\u0438 ',
                parseInt(this.props.params.percent) / 100,
                ' \u0447\u0430\u0441\u0442\u044C \u044F\u0431\u043B\u043E\u043A\u0430. '
            ),
            this.props.params.status == this.STATUS_ROTTEN ? React.createElement(
                'a',
                { href: '', onClick: this.deleteApple },
                '\u042F\u0431\u043B\u043E\u043A\u043E \u0441\u0433\u043D\u0438\u043B\u043E, \u0443\u0434\u0430\u043B\u0438\u0442\u044C'
            ) : React.createElement(
                'div',
                null,
                '\u044F\u0431\u043B\u043E\u043A\u043E \u0441\u043F\u0435\u043B\u043E\u0435'
            )
        );
    }
}

export default Apple;