var _jsxFileName = 'backend\\jsx\\components\\Apple.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Apple = function (_React$Component) {
    _inherits(Apple, _React$Component);

    function Apple(props) {
        _classCallCheck(this, Apple);

        var _this = _possibleConstructorReturn(this, (Apple.__proto__ || Object.getPrototypeOf(Apple)).call(this, props));

        _this.pickApple = _this.pickApple.bind(_this);
        _this.eatApple = _this.eatApple.bind(_this);

        return _this;
    }

    _createClass(Apple, [{
        key: 'pickApple',
        value: function pickApple(e) {
            var _this2 = this;

            e.preventDefault();
            fetch('/apple/pick-apple', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ id: this.props.params.id })
            }).then(function (res) {
                return res.json();
            }).then(function (result) {
                if (result.status === 'success') {
                    _this2.props.pickApple(_this2.props.params.id);
                }
            });
        }
    }, {
        key: 'eatApple',
        value: function eatApple(e) {
            var _this3 = this;

            e.preventDefault();
            var percent = parseFloat(prompt('введите часть яблока, которую хотите съесть, от 0.1 до 1', '0.5'));
            if (!isNaN(percent) && percent >= 0.1 && percent <= 1) {
                fetch('/apple/eat-apple', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({ id: this.props.params.id, percent: percent })
                }).then(function (res) {
                    return res.json();
                }).then(function (result) {
                    switch (result.status) {
                        case 'eated partial':
                            {
                                alert('\u0412\u044B \u0441\u044A\u0435\u043B\u0438 ' + percent + ' \u0447\u0430\u0441\u0442\u044C');
                                _this3.props.eatApple(_this3.props.params.id, percent);
                                break;
                            }
                        case 'not picked':
                            {
                                alert('Сначала надо сорвать яблоко, потом уже есть!');
                                break;
                            }
                        case 'eaten':
                            {
                                _this3.props.eatApple(_this3.props.params.id, percent);
                                alert('Вы полностью доели яблоко!');
                                break;
                            }
                        case 'overhead':
                            {
                                alert('вы не можете съесть больше, чем осталось, а это' + _this3.props.params.percent - percent * 100 + 'процентов, или ' + _this3.props.params.percent / 100 - percent + 'часть');
                            }
                    }
                });
            } else {
                alert('вы ввели неправильное значение!');
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: { 'padding': '20' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 69
                    },
                    __self: this
                },
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
                        }, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 70
                        },
                        __self: this
                    },
                    this.props.params.id
                ),
                this.props.params.status == 0 ? React.createElement(
                    'div',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 82
                        },
                        __self: this
                    },
                    React.createElement(
                        'a',
                        { href: '', onClick: this.pickApple, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 82
                            },
                            __self: this
                        },
                        '\u0421\u043E\u0440\u0432\u0430\u0442\u044C'
                    )
                ) : React.createElement(
                    'div',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 83
                        },
                        __self: this
                    },
                    '\u044F\u0431\u043B\u043E\u043A\u043E \u0441\u043E\u0440\u0432\u0430\u043D\u043E'
                ),
                React.createElement(
                    'div',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 84
                        },
                        __self: this
                    },
                    React.createElement(
                        'a',
                        { href: '', onClick: this.eatApple, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 84
                            },
                            __self: this
                        },
                        '\u0421\u044A\u0435\u0441\u0442\u044C'
                    )
                ),
                this.props.params.percent == 0 ? React.createElement(
                    'div',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 86
                        },
                        __self: this
                    },
                    '\u0412\u044B \u0435\u0449\u0435 \u043D\u0435 \u043A\u0443\u0448\u0430\u043B\u0438 \u044F\u0431\u043B\u043E\u043A\u043E'
                ) : React.createElement(
                    'div',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 87
                        },
                        __self: this
                    },
                    '\u0432\u044B \u0443\u0436\u0435 \u0441\u044A\u0435\u043B\u0438 ',
                    parseInt(this.props.params.percent) / 100,
                    ' \u0447\u0430\u0441\u0442\u044C \u044F\u0431\u043B\u043E\u043A\u0430. '
                )
            );
        }
    }]);

    return Apple;
}(React.Component);

export default Apple;