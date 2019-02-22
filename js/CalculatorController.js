class CalculatorController {
    constructor() {
        this._calcDisplay = document.querySelector("#display_txt");
        this.initialize_buttons();
        this.initialize_keyboard();
        this.initialize_calc();
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
        document.addEventListener('keyup', e=>{
            this.onClick(e.key);
        })
    }

    onClick(btn) {
        console.log(btn);
    }

    initialize_calc() {
        this.displayText = "0";
    }

    action(value) {

    }


    //#region getters and setters
    set displayText(value) {
        this._calcDisplay.innerHTML = value;
    }

    get displayText() {
        return this._calcDisplay.innerHTML;
    }
    //#endregion
}

let ctr = new CalculatorController();