let game = {
        figuras: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10'],

    cards: null,
    lockMode: false,
    fistCard: null,
    secundCard: null,

// logica do jogo
//seleciona a carta clickada e atribui a uma variavel
    setCard: function(id){
        let card = this.cards.filter(card => card.id === id)[0];
        console.log(card);
        console.log(id);

        if (card.flipped === true || this.lockMode) {

            return false;
        }
        if (!this.fistCard && !card.flipped) {
            this.fistCard = card;
            this.fistCard.flipped = true;
            console.log("Primeira carta");
            return true;
        }
        if(this.fistCard && !card.flipped){
            this.secundCard = card;
            this.secundCard.flipped = true;
            this.lockMode = true;
            console.log("segunda carta")
            return true;  
        }
         else {
            console.log("else set cards");
            return true;
            
            
        }
        
    },
    //confere se as 2 cartas selecionadas tem o mesmo icon
checkMatch: function(){
        if(!this.fistCard || !this.secundCard){
            console.log('tst chechMatch')
            return false
        }
        console.log(' checkMatch combinou')
        return this.fistCard.icon === this.secundCard.icon;
        
    },
//limpa as propriedades das cartas quando não combinada
    clearCards: function(){
        this.fistCard.flipped = false;
        this.secundCard.flipped = false;
        this.fistCard = null;
        this.secundCard = null;
        this.lockMode = false;  
    },
    //limpa as propriedades exeto flipped
    clearCardsMatch: function(){
        this.fistCard = null;
        this.secundCard = null;
        this.lockMode = false;  
    },
    //mapea e confere se todas cards estão flipeed
    gameover: function (){

        let gamecomplet = this.cards.flatMap(tst => tst)
        let gamefinishCheck = gamecomplet.every(tst => tst.flipped);
            if (gamefinishCheck){
                let finish = document.getElementById('gameover');
                finish.style.display = "flex"
         }          
    }, 
    // reinicia o jogo
 restart: function (){
    let finish = document.getElementById('gameover');
    finish.style.display = "none"
    
    let newcards = this.cards.flatMap(tst => tst);
        newcards.forEach (card2 => {
            card2.flipped = false;
            card2.cardcreate = null;
            this.allFlip();
            this.embaralhar();
            
        }
    ) 
    
},
//vira todas cartas
    allFlip: function(){  
        const cardtras = document.querySelectorAll('.card');
        cardtras.forEach(elemento => {
            elemento.classList.remove('flip');
          });
    },

    cardcreate: function(){
        this.cards = [];

        this.figuras.forEach((figura) => {
            this.cards.push(this.criandopares(figura));
        })
            this.cards = this.cards.flatMap(pair => pair);
        this.embaralhar();
            
    },
    criandopares: function(figura){
        return [{
            id: this.geradoridcards(figura),
            icon: figura,
            flipped: false,
        },
            {
                id: this.geradoridcards(figura),
                icon: figura,
                flipped: false,
            }
        ]
    },
    
    
    geradoridcards: function(indent){
        return indent + parseInt(Math.random() * 1000);
    
    },
    embaralhar: function(cards){
        let cardindex = this.cards.length;
        let misturar = 0;
    
        while(cardindex !== 0){
            misturar = Math.floor(Math.random() * cardindex);
            cardindex--;
            [this.cards[cardindex] , this.cards[misturar]] = [this.cards[misturar], this.cards[cardindex]];
        }
    },    

}






