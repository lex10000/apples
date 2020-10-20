class Apple extends React.Component {
    constructor(props) {
        super(props);
        this.pickApple = this.pickApple.bind(this);
        this.eatApple = this.eatApple.bind(this);

    }

    pickApple(e) {
        e.preventDefault();
        fetch('/apple/pick-apple', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({id:this.props.params.id})
        })
            .then(res => res.json())
            .then(result => {
                if(result.status === 'success') {
                    this.props.pickApple(this.props.params.id);
                }
            })
    }

    eatApple(e) {
        e.preventDefault();
        let percent = parseFloat(prompt('введите часть яблока, которую хотите съесть, от 0.1 до 1', '0.5'));
        if(!isNaN(percent) && percent>=0.1 && percent<=1) {
            fetch('/apple/eat-apple', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({id:this.props.params.id, percent: percent})
            })
                .then(res => res.json())
                .then(result => {
                    switch (result.status) {
                        case 'eated partial' : {
                            alert(`Вы съели ${percent} часть`);
                            this.props.eatApple(this.props.params.id, percent);
                            break;
                        }
                        case 'not picked': {
                            alert('Сначала надо сорвать яблоко, потом уже есть!');
                            break;
                        }
                        case 'eaten': {
                            this.props.eatApple(this.props.params.id, percent);
                            alert('Вы полностью доели яблоко!');
                            break;
                        }
                        case 'overhead': {
                            alert('вы не можете съесть больше, чем осталось, а это' + this.props.params.percent - percent * 100 + 'процентов, или ' +
                                this.props.params.percent / 100 - percent + 'часть');
                        }
                    }
                })
        } else {
            alert('вы ввели неправильное значение!');
        }
    }

    render() {
        return (
            <div style={{'padding': '20'}}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: this.props.params.color,
                    borderRadius: '25px',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: 'center'
                }}>
                    {this.props.params.id}
                </div>
                {(this.props.params.status==0)
                    ? <div><a href="" onClick={this.pickApple}>Сорвать</a></div>
                    : <div>яблоко сорвано</div>}
                <div><a href="" onClick={this.eatApple}>Съесть</a></div>
                {(this.props.params.percent==0)
                    ? <div>Вы еще не кушали яблоко</div>
                    : <div>вы уже съели {parseInt(this.props.params.percent)/100} часть яблока. </div>
                }

            </div>
        );
    }
}

export default Apple;