

  /**
   * this function gives value to the card
   * @param {String} carta 
   * @returns {Number} this is the card value 
   */

  export const valorCarta = (carta) => {
   const aux = carta.substring(0, carta.length - 1);
   return (isNaN(aux)) ? 
         (aux === 'A') ? 11 : 10 
      : aux * 1

};