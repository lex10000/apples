var _jsxFileName = 'backend\\jsx\\components\\Tree.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Apple from "./Apple.js";

var Tree = function (_React$Component) {
    _inherits(Tree, _React$Component);

    function Tree(props) {
        _classCallCheck(this, Tree);

        var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));

        _this.generateApples = _this.generateApples.bind(_this);
        _this.pickApple = _this.pickApple.bind(_this);
        _this.eatApple = _this.eatApple.bind(_this);
        _this.state = {
            apples: [],
            isLoaded: false
        };
        return _this;
    }

    _createClass(Tree, [{
        key: 'generateApples',
        value: function generateApples(e) {
            var _this2 = this;

            e.preventDefault();
            fetch('/apple/generate', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(function (res) {
                return res.json();
            }).then(function (result) {
                _this2.setState({
                    apples: result.apples
                });
            });
        }
    }, {
        key: 'pickApple',
        value: function pickApple(id) {
            var apples = this.state.apples;
            var i = apples.findIndex(function (apple) {
                return apple.id === id;
            });
            apples[i].status = 1;
            this.setState({ apples: apples });
        }
    }, {
        key: 'eatApple',
        value: function eatApple(id, percent) {
            //проверка даты, когда упало, с текущим, если успешно - то пошли дальше
            var apples = this.state.apples;
            var i = apples.findIndex(function (apple) {
                return apple.id === id;
            });
            apples[i].percent = parseFloat(apples[i].percent) + percent * 100;
            //если больше 100процентов, то удаляем яблоко из стейта
            if (apples[i].percent >= 100) {
                console.log(123);
                apples.splice(i, 1);
            }
            this.setState({ apples: apples });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            fetch('/apple/get-apples').then(function (res) {
                return res.json();
            }).then(function (result) {
                _this3.setState({
                    apples: result.apples,
                    isLoaded: true
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var apples = this.state.apples;

            console.log(apples);
            if (this.state.isLoaded) {
                if (apples.length === 0) {
                    return React.createElement(
                        'div',
                        {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 70
                            },
                            __self: this
                        },
                        React.createElement(
                            'a',
                            { href: '', onClick: this.generateApples, style: {
                                    display: "flex",
                                    justifyContent: "center"
                                }, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 70
                                },
                                __self: this
                            },
                            '\u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u044F\u0431\u043B\u043E\u043A\u0438'
                        )
                    );
                } else {
                    return React.createElement(
                        'div',
                        { style: { 'display': 'flex', 'justifyContent': 'space-between' }, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 77
                            },
                            __self: this
                        },
                        apples.map(function (apple) {
                            return React.createElement(Apple, {
                                params: apple,
                                key: apple.id,
                                pickApple: _this4.pickApple,
                                eatApple: _this4.eatApple,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 79
                                },
                                __self: _this4
                            });
                        })
                    );
                }
            } else {
                return React.createElement(
                    'div',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 90
                        },
                        __self: this
                    },
                    '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..'
                );
            }
        }
    }]);

    return Tree;
}(React.Component);

export default Tree;