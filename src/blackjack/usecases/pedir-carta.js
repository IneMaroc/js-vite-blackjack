
/**
 * This function ask for a card of the deck
 * @param {array<String>} deck Example: ['2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', '9S', '10C', '10D', '10H', '10S', 'AC', 'JC', 'QC', 'KC', 'AD', 'JD', 'QD', 'KD', 'AH', 'JH', 'QH', 'KH', 'AS', 'JS', 'QS', 'KS']
 * @returns {String} this returns a card. Example: AD
 */

export const pedirCarta = (deck) => {

   if( !deck || deck.length === 0) {
      throw 'No hay cartas en la Baraja';
   }
   let i = Math.floor(Math.random()*deck.length);
   const carta = deck[i];
   deck = deck.filter((element) => element !== carta);
   return carta;

};