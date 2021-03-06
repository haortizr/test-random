
describe('Los estudiantes under monkeys', function(){
    it('Visits los estudiantes and survives monkeys ', function(){
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEventMonkey(10);
    })
})

function randomEventMonkey(monkeysLeft){
    var events = [{ tipo:'a'}, {tipo:'button'}, {tipo:'input[type="text"]'}, {tipo:'select'}]

    function getRandomInt(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max-min))+min;
    }

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft>0){
        
        var randomEvent = getRandomInt(0, events.length);

        cy.get(events[randomEvent].tipo).then($elements => {
            if($elements.length>0){
                let randomElement = $elements.get(getRandomInt(0, $elements.length));
                console.log(randomElement)
                if(typeof randomElement!=="undefined" && !Cypress.dom.isHidden(randomElement)){
		    console.log("--->"+monkeysLeft);
                    if(randomEvent == 0 || randomEvent == 1){
			    //hacemos click en link o buton
                        cy.wrap(randomElement).click({force:true});
                    }
                    if(randomEvent == 2){
                        cy.wrap(randomElement).click({ force: true }).type('Probando Input', { force: true });
                    }
                    if(randomEvent ==3 && randomEvent.options !== undefined){
			    //selecciono un opcion de un combo
                        var randomOption = randomEvent.options[getRandomInt(0, randomEvent.options.length)].value;
                        cy.wrap(randomEvent).select(randomOption, { force: true });
                    }
                    monkeysLeft = monkeysLeft - 1;
                }
            }
            
            cy.wait(1000)
            randomEventMonkey(monkeysLeft)
        });
    }
}