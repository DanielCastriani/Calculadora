class CalculatorController {
    constructor() {
        this._calcDisplay = document.querySelector("#display_txt");
        this._clickAudio = new Audio('click.mp3');

        this.initialize_calc();
        this.initialize_buttons();
        this.initialize_keyboard();
    }


    initialize_calc() {
        this._lastOper = '';
        this._lastNum = '';
        this._exp = ['0'];
        this.updateDisplay();
    }

    initialize_buttons() {
        let btns = document.querySelectorAll(".btn");
        btns.forEach(btn => {
            btn.addEventListener('click', e => {
                this.onClick(btn.id.split('-')[1]);
            });
        })
    }

    initialize_keyboard() {
        document.addEventListener('keyup', e => {
            this.onClick(e.key);
        })
    }

    getLastElm(isNum = true) {
        isNum = !isNum;
        for (let i = this._exp.length - 1; i >= 0; i--) {
            if (isNaN(this._exp[i]) == isNum) {
                return this._exp[i];
            }
        }
    }

    updateDisplay() {
        this.displayText = this.getLastElm();
    }

    error() {
        this.displayText = 'Error'
    }

    playAudio() {
        this._clickAudio.currentTime = 0.9;
        this._clickAudio.play();
    }

    onClick(btn) {
        switch (btn) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOper(btn);
                break;
            case 'ce':
            case 'Delete':
                this.clearEntry();
                break;
            case 'c':
            case 'Escape':
                this.initialize_calc();
                break;
            case 'bksp':
            case 'Backspace':
                this.bksp();
                break;
            case 'divide':
            case '/':
                this.addOper('/');
                break;
            case 'mult':
            case '*':
                this.addOper('*');
                break;
            case 'sub':
            case '-':
                this.addOper('-');
                break;
            case 'sum':
            case '+':
                this.addOper('+');
                break;
            case 'mod':
                this.addOper('%');
                break;
            case 'float':
            case '.':
            case ',':
                this.floatNumber();
                break;
            case 'eq':
            case '=':
                this.calc();
                break;
        }
        this.updateDisplay();
        this.playAudio();
        console.log(this._exp);
    }

    getLast() {
        return this._exp.length > 0 ? this._exp[this._exp.length - 1] : undefined;
    }

    addOper(opr) {
        if (isNaN(this.getLast())) {
            if (isNaN(opr)) {
                this._exp[this._exp.length - 1] = opr;
            } else {
                this._exp.push(opr);
            }
        } else {
            if (isNaN(opr)) {
                this._exp.push(opr);
            } else {
                if (this._exp[this._exp.length - 1].length < 15)
                    this._exp[this._exp.length - 1] = parseFloat(this._exp[this._exp.length - 1] + opr).toString();
            }
        }
        if (this._exp.length > 3) {
            this.calc();
        }
    }

    calc() {
        try {

            let lopr = this.getLastElm(false);
            if (lopr)
                this._lastOper = lopr;

            if (this._exp.length < 3) {
                this._exp = [this._exp[0], this._lastOper, this._lastNum];
            }
            this._lastNum = this.getLastElm();


            if (this._exp.length == 3) {
                this._exp = [this.evalExp()];

            } else {
                if (this._exp.length > 3) {
                    let last = this._exp.pop();
                    this._exp = [this.evalExp(), last];
                }
            }
        } catch (e) {
            this.error();
        }
    }

    evalExp() {
        return eval(this._exp.join(' ')).toString();
    }

    clearEntry() {
        if (this._exp.length != 2)
            this._exp[this._exp.length - 1] = '0';
        else
            this.addOper('0');
    }

    bksp() {
        if (!isNaN(this.getLast())) {
            if (this.getLast().length > 1) {
                let i = this._exp.length - 1;
                let val = this._exp[i];
                this._exp[i] = val.substring(0, val.length - 1);
            } else {
                this._exp[this._exp.length - 1] = '0';
            }
        }
    }

    floatNumber() {
        if (isNaN(this.getLast())) {
            this.addOper('0');
        }

        if (this._exp[this._exp.length - 1].split('.').length == 1) {
            this._exp[this._exp.length - 1] = this._exp[this._exp.length - 1] + '.';
        }
    }

    set displayText(value) {
        this._calcDisplay.innerHTML = value;
    }

    get displayText() {
        return this._calcDisplay.innerHTML;
    }
}

let ctr = new CalculatorController();