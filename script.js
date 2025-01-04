const FRONT = 'cardfront'
const BACK = 'cardback'
const CARD = 'card'
const ICON = 'icon'



stargame();

function stargame(){
    iniciandocartas(game.cardcreate());
    console.log(game.cards)
}

function restartgame(){
    game.restart();
    console.log(game.cards)
    
    
}

function iniciandocartas(){
    let tabuleiro = document.getElementById("tabuleiro");

    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        cardElement.addEventListener('click', flipcard);
        criandoCartas(card, cardElement);
        tabuleiro.appendChild(cardElement);

    });

}

function criandoCartas(card, cardElement){

    criandoCartasFace(FRONT, card, cardElement);
    criandoCartasFace(BACK, card, cardElement);
}

function criandoCartasFace(face, card, element){

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face === FRONT){
        let iconElement = document.createElement('img')
            iconElement.classList.add(ICON);
            iconElement.src = './image/figura' + card.icon + '.png';
            cardElementFace.appendChild(iconElement);

    } else {
        cardElementFace.innerHTML = '&lt/&gt '
    }
    element.appendChild(cardElementFace);
}

function flipcard(){
    
    if (game.setCard(this.id)) {

    this.classList.add('flip');
        if(game.secundCard){
        if (game.checkMatch()){
            game.clearCardsMatch();
            game.gameover();   
                console.log('combinação')
        } else {
            
            setTimeout(()=>{
                
                let primeiravista = document.getElementById(game.fistCard.id);
                let segundavista = document.getElementById(game.secundCard.id);

                primeiravista.classList.remove('flip');
                segundavista.classList.remove('flip');
                game.clearCards();
                console.log('deu else')
            },1000);
        }
    }
  }
};
